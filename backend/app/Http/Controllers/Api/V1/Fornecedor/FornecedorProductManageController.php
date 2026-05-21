<?php

namespace App\Http\Controllers\Api\V1\Fornecedor;

use App\Exports\FornecedorProductTemplateExport;
use App\Http\Controllers\Api\V1\Controller;
use App\Http\Requests\FornecedorProductImportRequest;
use App\Services\FornecedorProductImportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class FornecedorProductManageController extends Controller
{
    public function index(Request $request)
    {
        return view('fornecedor.produtos.importar', [
            'preview' => null,
            'report' => null,
            'downloadTemplateUrl' => route('fornecedor.produtos.modelo'),
        ]);
    }

    public function template()
    {
        return Excel::download(new FornecedorProductTemplateExport(), 'modelo-importacao-produtos-fornecedor.xlsx');
    }

    public function validateImport(FornecedorProductImportRequest $request, FornecedorProductImportService $service)
    {
        $user = auth('sanctum')->user()
            ?? auth('web')->user()
            ?? $request->user();

        $result = $service->preview(
            $request->file('planilha'),
            $request->file('imagens', []),
            $request->file('imagens_zip'),
            $user
        );

        $payload = [
            'preview' => $result['rows'],
            'summary' => $result['summary'],
            'missing_columns' => $result['missing_columns'] ?? [],
            'preview_token' => $result['preview_token'] ?? null,
            'download_template_url' => route('fornecedor.produtos.modelo'),
            'ok' => $result['ok'],
            'message' => $result['ok']
                ? 'Planilha validada com sucesso. Revise o preview e confirme a importação.'
                : ($result['message'] ?? 'A planilha possui erros.'),
        ];

        if ($request->expectsJson()) {
            return response()->json($payload, $result['ok'] ? 200 : 422);
        }

        return view('fornecedor.produtos.importar', [
            'preview' => $result['rows'],
            'report' => null,
            'summary' => $result['summary'],
            'missingColumns' => $result['missing_columns'] ?? [],
            'previewToken' => $result['preview_token'],
            'downloadTemplateUrl' => route('fornecedor.produtos.modelo'),
            'message' => $payload['message'],
            'ok' => $result['ok'],
        ]);
    }

    public function confirmImport(Request $request, FornecedorProductImportService $service)
    {
        $request->validate([
            'preview_token' => 'required|string',
        ]);

        $user = auth('sanctum')->user()
            ?? auth('web')->user()
            ?? $request->user();

        $result = $service->commit($request->string('preview_token')->toString(), $user);

        if ($request->expectsJson()) {
            return response()->json($result, $result['ok'] ? 200 : 422);
        }

        return view('fornecedor.produtos.importar', [
            'preview' => null,
            'report' => $result,
            'summary' => $result['summary'] ?? null,
            'downloadTemplateUrl' => route('fornecedor.produtos.modelo'),
            'message' => $result['message'] ?? null,
            'ok' => $result['ok'],
        ]);
    }
}
