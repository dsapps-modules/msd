<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class FornecedorProductImportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'planilha' => 'required|file|mimes:xlsx,xls,csv|max:10240',
            'imagens_zip' => 'nullable|file|mimes:zip|max:10240',
            'imagens' => 'nullable|array',
            'imagens.*' => 'nullable|file|mimetypes:image/jpeg,image/png,image/webp,image/jpg|mimes:jpg,jpeg,png,webp|max:5120',
        ];
    }

    public function messages(): array
    {
        return [
            'planilha.required' => 'A planilha é obrigatória.',
            'planilha.file' => 'A planilha enviada é inválida.',
            'planilha.mimes' => 'A planilha deve ser .xlsx, .xls ou .csv.',
            'imagens_zip.mimes' => 'O arquivo ZIP deve ser válido.',
            'imagens.*.mimetypes' => 'As imagens devem ser JPEG, PNG ou WEBP.',
            'imagens.*.mimes' => 'As imagens devem ser JPG, JPEG, PNG ou WEBP.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Falha na validação.',
            'errors' => $validator->errors(),
        ], 422));
    }
}
