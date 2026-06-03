<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class FornecedorProductUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $user = $this->user('web') ?? $this->user();
        $accountId = $user?->id;
        $product = $this->route('product');
        $productId = $product instanceof Product ? $product->id : $product;

        return [
            'codigo' => [
                'required',
                'string',
                'max:255',
                Rule::unique((new Product())->getTable(), 'codigo')
                    ->where(fn ($query) => $query->where('account_id', $accountId))
                    ->ignore($productId),
            ],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'altura' => ['required', 'numeric', 'min:0'],
            'largura' => ['required', 'numeric', 'min:0'],
            'comprimento' => ['required', 'numeric', 'min:0'],
            'peso' => ['required', 'numeric', 'min:0'],
            'embalagem' => ['required', 'string', 'max:255'],
            'valor_venda' => ['required', 'numeric', 'min:0'],
            'estoque_reservado' => ['required', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'codigo.required' => 'O código do produto é obrigatório.',
            'codigo.unique' => 'Já existe um produto com este código para este fornecedor.',
            'name.required' => 'O nome do produto é obrigatório.',
            'altura.required' => 'A altura é obrigatória.',
            'largura.required' => 'A largura é obrigatória.',
            'comprimento.required' => 'O comprimento é obrigatório.',
            'peso.required' => 'O peso é obrigatório.',
            'embalagem.required' => 'A embalagem é obrigatória.',
            'valor_venda.required' => 'O valor de venda é obrigatório.',
            'estoque_reservado.required' => 'O estoque reservado é obrigatório.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            redirect()
                ->back()
                ->withErrors($validator)
                ->withInput()
        );
    }
}
