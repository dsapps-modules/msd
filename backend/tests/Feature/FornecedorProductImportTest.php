<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Spatie\Permission\Models\Role;
use Tests\TestCase;
use Illuminate\Support\Str;

class FornecedorProductImportTest extends TestCase
{
    public function test_fornecedor_can_preview_and_import_products_with_images(): void
    {
        Storage::fake('public');

        $user = $this->makeFornecedorUser();
        $spreadsheet = $this->makeSpreadsheet([
            [
                'PROD-001',
                'Kit Clareador Dental Premium',
                10,
                20,
                30,
                0.850,
                'Caixa',
                'R$ 249,90',
                'PROD-001-1.jpg;PROD-001-2.jpg',
                15,
            ],
        ]);

        $validate = $this->withHeaders(['Accept' => 'application/json'])
            ->actingAs($user, 'sanctum')
            ->post('/api/v1/fornecedor/produtos/importar', [
            'planilha' => $spreadsheet,
            'imagens' => [
                UploadedFile::fake()->image('PROD-001-1.jpg'),
                UploadedFile::fake()->image('PROD-001-2.jpg'),
            ],
        ]);

        $validate->assertOk();
        $validate->assertJsonPath('ok', true);
        $previewToken = $validate->json('preview_token');
        $this->assertNotEmpty($previewToken);

        $confirm = $this->actingAs($user, 'sanctum')->postJson('/api/v1/fornecedor/produtos/importar/confirmar', [
            'preview_token' => $previewToken,
        ]);

        $confirm->assertOk();
        $confirm->assertJsonPath('ok', true);
        $confirm->assertJsonPath('summary.imported_products', 1);

        $this->assertDatabaseHas('products', [
            'account_id' => $user->id,
            'codigo' => 'PROD-001',
            'name' => 'Kit Clareador Dental Premium',
            'valor_venda' => '249.90',
            'estoque_reservado' => 15,
        ]);

        $product = Product::withoutGlobalScopes()->where('account_id', $user->id)->where('codigo', 'PROD-001')->firstOrFail();
        $this->assertNotNull($product->image);
        $this->assertCount(2, $product->images);

        $this->assertDatabaseHas('product_images', [
            'product_id' => $product->id,
            'filename' => 'PROD-001-1.jpg',
            'is_primary' => 1,
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('product_images', [
            'product_id' => $product->id,
            'filename' => 'PROD-001-2.jpg',
            'is_primary' => 0,
            'sort_order' => 2,
        ]);
    }

    public function test_fornecedor_import_reports_missing_columns_without_inserting_products(): void
    {
        Storage::fake('public');

        $user = $this->makeFornecedorUser('fornecedor-missing-columns');
        $spreadsheet = $this->makeSpreadsheet([
            [
                'PROD-002',
                'Produto Incompleto',
                10,
                20,
                30,
                0.750,
                'Caixa',
                '199,90',
                // missing IMAGENS and ESTOQUE RESERVADO
            ],
        ], [
            'CODIGO',
            'DESCRIÇÃO DO PRODUTOS',
            'ALTURA',
            'LARGURA',
            'COMPRIMENTO',
            'PESO',
            'EMBALAGEM',
            'VALOR DE VENDA',
        ]);

        $response = $this->withHeaders(['Accept' => 'application/json'])
            ->actingAs($user, 'sanctum')
            ->post('/api/v1/fornecedor/produtos/importar', [
            'planilha' => $spreadsheet,
        ]);

        $response->assertStatus(422);
        $response->assertJsonPath('ok', false);
        $response->assertJsonPath('missing_columns.0', 'IMAGENS');
        $response->assertJsonPath('missing_columns.1', 'ESTOQUE RESERVADO');

        $this->assertDatabaseMissing('products', [
            'account_id' => $user->id,
            'codigo' => 'PROD-002',
        ]);
    }

    private function makeFornecedorUser(string $emailPrefix = 'fornecedor-import') : User
    {
        $role = Role::findOrCreate('fornecedor_admin', 'api');

        $user = User::query()->create([
            'first_name' => 'Fornecedor',
            'last_name' => 'Importador',
            'slug' => Str::slug($emailPrefix . '-' . Str::random(6)),
            'phone' => '11999990000',
            'email' => $emailPrefix . '-' . Str::random(4) . '@example.com',
            'email_verified' => true,
            'password' => bcrypt('password'),
            'activity_scope' => 'fornecedor_level',
            'account_type' => 'fornecedor',
            'status' => 1,
        ]);

        $user->assignRole($role);

        return $user;
    }

    /**
     * @param array<int, array<int, mixed>> $rows
     * @param array<int, string>|null $headers
     */
    private function makeSpreadsheet(array $rows, ?array $headers = null): UploadedFile
    {
        $headers ??= [
            'CODIGO',
            'DESCRIÇÃO DO PRODUTOS',
            'ALTURA',
            'LARGURA',
            'COMPRIMENTO',
            'PESO',
            'EMBALAGEM',
            'VALOR DE VENDA',
            'IMAGENS',
            'ESTOQUE RESERVADO',
        ];

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->fromArray($headers, null, 'A1');

        foreach ($rows as $index => $row) {
            $sheet->fromArray($row, null, 'A' . ($index + 2));
        }

        $path = tempnam(sys_get_temp_dir(), 'fornecedor-import-') . '.xlsx';
        $writer = new Xlsx($spreadsheet);
        $writer->save($path);

        return new UploadedFile($path, 'produtos.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', null, true);
    }
}
