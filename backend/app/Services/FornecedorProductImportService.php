<?php

namespace App\Services;

use App\Helpers\MultilangSlug;
use App\Models\Media;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use ZipArchive;

class FornecedorProductImportService
{
    private const REQUIRED_HEADERS = [
        'CODIGO' => 'codigo',
        'DESCRICAO DO PRODUTOS' => 'descricao',
        'ALTURA' => 'altura',
        'LARGURA' => 'largura',
        'COMPRIMENTO' => 'comprimento',
        'PESO' => 'peso',
        'EMBALAGEM' => 'embalagem',
        'VALOR DE VENDA' => 'valor_venda',
        'IMAGENS' => 'imagens',
        'ESTOQUE RESERVADO' => 'estoque_reservado',
    ];

    private const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

    public function preview(UploadedFile $sheetFile, array $uploadedImages, ?UploadedFile $zipFile, User $user): array
    {
        $previewToken = (string) Str::uuid();
        $rows = $this->readSpreadsheet($sheetFile);
        $headers = $rows['headers'];
        $dataRows = $rows['rows'];

        $missingColumns = $this->missingColumns($headers);
        if (!empty($missingColumns)) {
            return [
                'ok' => false,
                'message' => 'A planilha está com colunas obrigatórias ausentes.',
                'missing_columns' => $missingColumns,
                'rows' => [],
                'summary' => [
                    'total_rows' => 0,
                    'valid_rows' => 0,
                    'invalid_rows' => 0,
                    'images_processed' => 0,
                    'images_linked' => 0,
                    'warnings' => [],
                ],
            ];
        }

        $staged = $this->stageImages($previewToken, $uploadedImages, $zipFile);
        $imageLookup = $staged['images'];
        $warnings = $staged['warnings'];

        $existingCodes = Product::withoutGlobalScopes()
            ->where('account_id', $user->id)
            ->whereNotNull('codigo')
            ->pluck('codigo')
            ->map(fn ($code) => $this->normalizeText($code))
            ->all();

        $seenCodes = [];
        $previewRows = [];
        $validRows = 0;
        $invalidRows = 0;
        $imageLinked = 0;
        $allErrors = [];

        foreach ($dataRows as $row) {
            $result = $this->validateRow($row, $user, $imageLookup, $existingCodes, $seenCodes);
            $previewRows[] = $result;

            if ($result['status'] === 'valid') {
                $validRows++;
                $imageLinked += $result['quantity_images'];
                $seenCodes[] = $this->normalizeText($result['codigo']);
                continue;
            }

            $invalidRows++;
            $allErrors = array_merge($allErrors, $result['errors']);
        }

        $usedImages = [];
        foreach ($previewRows as $previewRow) {
            foreach ($previewRow['imagens'] as $imageName) {
                $usedImages[] = $imageName;
            }
        }
        $unusedImages = array_values(array_diff(array_keys($imageLookup), array_unique($usedImages)));
        $warnings = array_values(array_unique(array_merge($warnings, $unusedImages)));

        $ok = $invalidRows === 0;

        if ($ok) {
            $manifest = [
                'user_id' => $user->id,
                'generated_at' => now()->toIso8601String(),
                'rows' => $previewRows,
                'images' => $imageLookup,
                'warnings' => $warnings,
            ];

            $this->writeManifest($previewToken, $manifest);
        } else {
            $this->deletePreviewWorkspace($previewToken);
        }

        return [
            'ok' => $ok,
            'preview_token' => $previewToken,
            'missing_columns' => [],
            'warnings' => $warnings,
            'rows' => $previewRows,
            'summary' => [
                'total_rows' => count($previewRows),
                'valid_rows' => $validRows,
                'invalid_rows' => $invalidRows,
                'images_processed' => count($imageLookup),
                'images_linked' => $imageLinked,
                'warnings' => $warnings,
                'errors' => array_values(array_unique($allErrors)),
            ],
        ];
    }

    public function commit(string $previewToken, User $user): array
    {
        $manifest = $this->readManifest($previewToken);

        if (!$manifest) {
            return [
                'ok' => false,
                'message' => 'Pré-visualização expirada ou inválida.',
                'summary' => null,
                'errors' => ['Não foi possível localizar os dados da pré-visualização.'],
            ];
        }

        if ((int) ($manifest['user_id'] ?? 0) !== (int) $user->id) {
            return [
                'ok' => false,
                'message' => 'Pré-visualização não pertence ao usuário autenticado.',
                'summary' => null,
                'errors' => ['A pré-visualização não pertence ao fornecedor logado.'],
            ];
        }

        $rows = $manifest['rows'] ?? [];
        $images = $manifest['images'] ?? [];

        DB::beginTransaction();
        try {
            $importedProducts = [];
            $processedImages = 0;
            $linkedImages = 0;

            foreach ($rows as $row) {
                $product = Product::withoutGlobalScopes()->create([
                    'account_id' => $user->id,
                    'codigo' => $row['codigo'],
                    'name' => $row['descricao'],
                    'description' => $row['descricao'],
                    'altura' => $row['altura'],
                    'largura' => $row['largura'],
                    'comprimento' => $row['comprimento'],
                    'peso' => $row['peso'],
                    'embalagem' => $row['embalagem'],
                    'valor_venda' => $row['valor_venda'],
                    'estoque_reservado' => $row['estoque_reservado'],
                    'slug' => MultilangSlug::makeSlug(Product::class, $row['descricao'], 'slug'),
                    'status' => 'pending',
                ]);

                $mediaIds = [];
                foreach ($row['imagens'] as $imagePosition => $filename) {
                    $imageInfo = $images[$filename] ?? null;
                    if (!$imageInfo) {
                        throw new \RuntimeException("Imagem ausente no staging: {$filename}");
                    }

                    $media = $this->storeMediaFile($imageInfo['tmp_path'], $filename, $user);
                    $processedImages++;
                    $mediaIds[] = $media->id;

                    ProductImage::query()->create([
                        'product_id' => $product->id,
                        'path' => $media->path,
                        'filename' => $filename,
                        'is_primary' => $imagePosition === 0,
                        'sort_order' => $imagePosition + 1,
                    ]);
                }

                $product->update([
                    'image' => $mediaIds[0] ?? null,
                    'gallery_images' => count($mediaIds) > 1 ? implode(',', array_slice($mediaIds, 1)) : null,
                ]);

                $importedProducts[] = [
                    'id' => $product->id,
                    'codigo' => $product->codigo,
                    'descricao' => $product->name,
                    'valor_venda' => $product->valor_venda,
                    'estoque_reservado' => $product->estoque_reservado,
                    'imagens' => count($mediaIds),
                ];
                $linkedImages += count($mediaIds);
            }

            DB::commit();
            $this->deleteManifest($previewToken);

            return [
                'ok' => true,
                'message' => 'Produtos importados com sucesso.',
                'summary' => [
                    'total_rows' => count($rows),
                    'imported_products' => count($importedProducts),
                    'products_with_error' => 0,
                    'images_processed' => $processedImages,
                    'images_linked' => $linkedImages,
                ],
                'products' => $importedProducts,
                'errors' => [],
            ];
        } catch (\Throwable $th) {
            DB::rollBack();
            return [
                'ok' => false,
                'message' => 'Falha ao importar os produtos.',
                'summary' => null,
                'errors' => [$th->getMessage()],
            ];
        }
    }

    private function readSpreadsheet(UploadedFile $sheetFile): array
    {
        $reader = IOFactory::createReaderForFile($sheetFile->getRealPath());
        $reader->setReadDataOnly(true);
        $spreadsheet = $reader->load($sheetFile->getRealPath());
        $worksheet = $spreadsheet->getActiveSheet();

        $highestRow = (int) $worksheet->getHighestDataRow();
        $highestColumnIndex = Coordinate::columnIndexFromString($worksheet->getHighestDataColumn());

        $headers = [];
        $columnMap = [];

        for ($column = 1; $column <= $highestColumnIndex; $column++) {
            $value = (string) $worksheet->getCellByColumnAndRow($column, 1)->getValue();
            $normalized = $this->normalizeHeader($value);
            $headers[] = $normalized;

            if (isset(self::REQUIRED_HEADERS[$normalized])) {
                $columnMap[self::REQUIRED_HEADERS[$normalized]] = $column;
            }
        }

        $rows = [];
        for ($row = 2; $row <= $highestRow; $row++) {
            $rowData = [];
            $hasValue = false;

            foreach (self::REQUIRED_HEADERS as $headerName => $fieldName) {
                $column = $columnMap[$fieldName] ?? null;
                $value = $column ? $worksheet->getCellByColumnAndRow($column, $row)->getFormattedValue() : null;
                $rowData[$fieldName] = $value;
                if ($this->normalizeText((string) $value) !== '') {
                    $hasValue = true;
                }
            }

            if ($hasValue) {
                $rowData['row_number'] = $row;
                $rows[] = $rowData;
            }
        }

        return [
            'headers' => $headers,
            'rows' => $rows,
        ];
    }

    private function missingColumns(array $headers): array
    {
        $missing = [];
        foreach (array_keys(self::REQUIRED_HEADERS) as $requiredHeader) {
            if (!in_array($requiredHeader, $headers, true)) {
                $missing[] = $requiredHeader;
            }
        }

        return $missing;
    }

    private function validateRow(array $row, User $user, array $imageLookup, array $existingCodes, array $seenCodes): array
    {
        $errors = [];
        $rowNumber = (int) ($row['row_number'] ?? 0);

        $codigo = $this->normalizeText((string) ($row['codigo'] ?? ''));
        $descricao = $this->normalizeText((string) ($row['descricao'] ?? ''));
        $altura = $this->parseDecimal($row['altura'] ?? null);
        $largura = $this->parseDecimal($row['largura'] ?? null);
        $comprimento = $this->parseDecimal($row['comprimento'] ?? null);
        $peso = $this->parseDecimal($row['peso'] ?? null);
        $embalagem = $this->normalizeText((string) ($row['embalagem'] ?? ''));
        $valorVenda = $this->parseMoney($row['valor_venda'] ?? null);
        $estoqueReservado = $this->parseInteger($row['estoque_reservado'] ?? null);
        $imagens = $this->parseImages((string) ($row['imagens'] ?? ''), $codigo);

        if ($codigo === '') {
            $errors[] = 'CODIGO é obrigatório.';
        }

        if ($descricao === '') {
            $errors[] = 'DESCRIÇÃO DO PRODUTOS é obrigatória.';
        }

        if ($altura === null) {
            $errors[] = 'ALTURA deve ser numérica.';
        }

        if ($largura === null) {
            $errors[] = 'LARGURA deve ser numérica.';
        }

        if ($comprimento === null) {
            $errors[] = 'COMPRIMENTO deve ser numérico.';
        }

        if ($peso === null) {
            $errors[] = 'PESO deve ser numérico.';
        }

        if ($embalagem === '') {
            $errors[] = 'EMBALAGEM é obrigatória.';
        }

        if ($valorVenda === null) {
            $errors[] = 'VALOR DE VENDA deve ser um valor numérico válido.';
        }

        if ($estoqueReservado === null) {
            $errors[] = 'ESTOQUE RESERVADO deve ser um número inteiro.';
        } elseif ($estoqueReservado < 0) {
            $errors[] = 'ESTOQUE RESERVADO não pode ser negativo.';
        }

        if ($codigo !== '') {
            if (in_array($codigo, $seenCodes, true) || in_array($codigo, $existingCodes, true)) {
                $errors[] = 'Já existe um produto com este código para este fornecedor.';
            }
        }

        if (empty($imagens)) {
            $errors[] = 'IMAGENS é obrigatória.';
        }

        foreach ($imagens as $index => $imageName) {
            if (!$this->matchesImagePattern($codigo, $imageName, $index + 1)) {
                $errors[] = "A imagem {$imageName} não segue o padrão obrigatório para o código {$codigo}.";
            }

            if (!isset($imageLookup[$imageName])) {
                $errors[] = "A imagem {$imageName} não foi enviada no upload.";
            }
        }

        $status = empty($errors) ? 'valid' : 'error';

        return [
            'row' => null,
            'codigo' => $codigo,
            'descricao' => $descricao,
            'altura' => $altura,
            'largura' => $largura,
            'comprimento' => $comprimento,
            'peso' => $peso,
            'embalagem' => $embalagem,
            'valor_venda' => $valorVenda,
            'estoque_reservado' => $estoqueReservado,
            'imagens' => $imagens,
            'quantity_images' => count($imagens),
            'status' => $status,
            'errors' => $errors,
            'warnings' => [],
            'row_number' => $rowNumber,
        ];
    }

    private function parseImages(string $value, string $codigo): array
    {
        $value = trim($value);
        if ($value === '') {
            return [];
        }

        $items = array_values(array_filter(array_map('trim', explode(';', $value))));
        $normalized = [];

        foreach ($items as $index => $item) {
            $item = basename($item);
            $normalized[] = $item;
            if ($codigo !== '' && !$this->matchesImagePattern($codigo, $item, $index + 1)) {
                continue;
            }
        }

        return $normalized;
    }

    private function matchesImagePattern(string $codigo, string $filename, int $position): bool
    {
        if ($codigo === '' || $filename === '') {
            return false;
        }

        $pattern = '/^' . preg_quote($codigo, '/') . '-' . $position . '\.(jpg|jpeg|png|webp)$/i';

        return (bool) preg_match($pattern, $filename);
    }

    private function parseDecimal(mixed $value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_numeric($value)) {
            return (float) $value;
        }

        $normalized = $this->normalizeMoneyString((string) $value);
        return is_numeric($normalized) ? (float) $normalized : null;
    }

    private function parseMoney(mixed $value): ?float
    {
        return $this->parseDecimal($value);
    }

    private function parseInteger(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        $normalized = preg_replace('/[^\d-]/', '', (string) $value);
        if ($normalized === '' || !is_numeric($normalized)) {
            return null;
        }

        return (int) $normalized;
    }

    private function normalizeMoneyString(string $value): string
    {
        $value = trim($value);
        $value = Str::of($value)->replace(['R$', ' '], '')->toString();

        if (str_contains($value, ',') && str_contains($value, '.')) {
            if (strrpos($value, ',') > strrpos($value, '.')) {
                $value = str_replace('.', '', $value);
                $value = str_replace(',', '.', $value);
            } else {
                $value = str_replace(',', '', $value);
            }
        } elseif (str_contains($value, ',')) {
            $value = str_replace(',', '.', $value);
        }

        return preg_replace('/[^\d\.\-]/', '', $value) ?? $value;
    }

    private function normalizeHeader(string $value): string
    {
        $value = Str::ascii($value);
        $value = strtoupper(trim($value));
        return preg_replace('/\s+/', ' ', $value) ?? $value;
    }

    private function normalizeText(string $value): string
    {
        return trim(preg_replace('/\s+/', ' ', $value) ?? $value);
    }

    private function stageImages(string $workspaceToken, array $uploadedImages, ?UploadedFile $zipFile): array
    {
        $images = [];
        $warnings = [];
        foreach ($uploadedImages as $file) {
            if (!$file instanceof UploadedFile || !$file->isValid()) {
                continue;
            }

            $filename = basename($file->getClientOriginalName());
            $this->assertAllowedImage($file->getRealPath(), $filename);
            $tmpPath = $this->writeTempImage($workspaceToken, $file->getRealPath(), $filename);
            $images[$filename] = [
                'tmp_path' => $tmpPath,
                'original_name' => $filename,
            ];
        }

        if ($zipFile instanceof UploadedFile && $zipFile->isValid()) {
            $zipResult = $this->extractZipImages($workspaceToken, $zipFile);
            foreach ($zipResult['images'] as $filename => $fileInfo) {
                $images[$filename] = $fileInfo;
            }
            $warnings = array_merge($warnings, $zipResult['warnings']);
            $extraImageNames = array_merge($extraImageNames, $zipResult['extra_names']);
        }

        return [
            'images' => $images,
            'warnings' => array_values(array_unique($warnings)),
            'extra_image_names' => [],
        ];
    }

    private function extractZipImages(string $workspaceToken, UploadedFile $zipFile): array
    {
        $images = [];
        $warnings = [];
        $extraNames = [];
        $zip = new ZipArchive();

        if ($zip->open($zipFile->getRealPath()) !== true) {
            throw new \RuntimeException('Não foi possível abrir o arquivo ZIP enviado.');
        }

        $extractRoot = $this->tempRoot($workspaceToken) . DIRECTORY_SEPARATOR . 'zip';
        File::ensureDirectoryExists($extractRoot);

        for ($i = 0; $i < $zip->numFiles; $i++) {
            $entryName = $zip->getNameIndex($i);
            if ($entryName === false || str_ends_with($entryName, '/')) {
                continue;
            }

            $baseName = basename($entryName);
            if ($baseName === '' || !preg_match('/\.(jpg|jpeg|png|webp)$/i', $baseName)) {
                continue;
            }

            $stream = $zip->getStream($entryName);
            if (!$stream) {
                continue;
            }

            $contents = stream_get_contents($stream);
            fclose($stream);

            $imageInfo = @getimagesizefromstring($contents ?: '');
            if ($imageInfo === false) {
                throw new \RuntimeException("O arquivo {$baseName} dentro do ZIP não é uma imagem válida.");
            }

            $tmpPath = $extractRoot . DIRECTORY_SEPARATOR . $baseName;
            file_put_contents($tmpPath, $contents);

            $images[$baseName] = [
                'tmp_path' => $tmpPath,
                'original_name' => $baseName,
            ];

            if (!in_array(strtolower(pathinfo($baseName, PATHINFO_EXTENSION)), self::ALLOWED_IMAGE_EXTENSIONS, true)) {
                $warnings[] = "A imagem {$baseName} foi ignorada por extensão não permitida.";
                $extraNames[] = $baseName;
            }
        }

        $zip->close();

        return [
            'images' => $images,
            'warnings' => $warnings,
            'extra_names' => $extraNames,
        ];
    }

    private function assertAllowedImage(string $filePath, string $filename): void
    {
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        if (!in_array($extension, self::ALLOWED_IMAGE_EXTENSIONS, true)) {
            throw new \RuntimeException("A imagem {$filename} possui extensão inválida.");
        }

        $mime = mime_content_type($filePath);
        if (!in_array($mime, ['image/jpeg', 'image/png', 'image/webp'], true)) {
            throw new \RuntimeException("A imagem {$filename} não possui MIME válido.");
        }
    }

    private function writeTempImage(string $workspaceToken, string $sourcePath, string $filename): string
    {
        $targetDir = $this->tempRoot($workspaceToken) . DIRECTORY_SEPARATOR . 'images';
        File::ensureDirectoryExists($targetDir);
        $targetPath = $targetDir . DIRECTORY_SEPARATOR . $filename;
        copy($sourcePath, $targetPath);

        return $targetPath;
    }

    private function storeMediaFile(string $sourcePath, string $filename, User $user): Media
    {
        $imageSize = getimagesize($sourcePath);
        if ($imageSize === false) {
            throw new \RuntimeException("Não foi possível ler a imagem {$filename}.");
        }

        [$width, $height] = $imageSize;
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        $imageName = pathinfo($filename, PATHINFO_FILENAME);
        $storageFolder = 'uploads/media-uploader/default';
        $storedFilename = Str::slug($imageName) . '-' . now()->format('YmdHisv') . '.' . $extension;
        $relativePath = $storageFolder . '/' . $storedFilename;

        Storage::disk('public')->put($relativePath, file_get_contents($sourcePath));

        $dimensions = $width . ' x ' . $height . ' pixels';
        $size = filesize($sourcePath) ?: 0;

        return Media::query()->create([
            'name' => $filename,
            'format' => $extension,
            'file_size' => $size . ' bytes',
            'path' => $relativePath,
            'dimensions' => $dimensions,
            'user_id' => $user->id,
            'user_type' => User::class,
            'usage_type' => 'product_main',
        ]);
    }

    private function tempRoot(string $token): string
    {
        return storage_path('app/tmp/fornecedor-product-import/' . $token);
    }

    private function manifestPath(string $token): string
    {
        return $this->tempRoot($token) . DIRECTORY_SEPARATOR . 'manifest.json';
    }

    private function writeManifest(string $token, array $manifest): void
    {
        $dir = $this->tempRoot($token);
        File::ensureDirectoryExists($dir);
        file_put_contents($this->manifestPath($token), json_encode($manifest, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    }

    private function readManifest(string $token): ?array
    {
        $path = $this->manifestPath($token);
        if (!file_exists($path)) {
            return null;
        }

        $payload = json_decode((string) file_get_contents($path), true);
        return is_array($payload) ? $payload : null;
    }

    private function deleteManifest(string $token): void
    {
        $dir = $this->tempRoot($token);
        if (!is_dir($dir)) {
            return;
        }

        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($dir, \FilesystemIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::CHILD_FIRST
        );

        foreach ($files as $file) {
            $path = $file->getRealPath();
            if ($path === false) {
                continue;
            }
            $file->isDir() ? rmdir($path) : unlink($path);
        }

        @rmdir($dir);
    }

    private function deletePreviewWorkspace(string $token): void
    {
        $this->deleteManifest($token);
    }
}
