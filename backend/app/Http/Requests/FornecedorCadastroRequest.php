<?php

namespace App\Http\Requests;

use App\Enums\StoreType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FornecedorCadastroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'store_type' => ['required', Rule::in($this->supplierStoreTypes())],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'birth_day' => ['required', 'date'],
            'cpf' => ['required', 'string', 'max:14', Rule::unique('users', 'cpf')],
            'cnpj' => ['required', 'string', 'max:18', Rule::unique('stores', 'cnpj')],
            'phone' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'cep' => ['required', 'string', 'max:9'],
            'street_type' => ['required', 'string', 'max:100'],
            'street_name' => ['required', 'string', 'max:255'],
            'street_number' => ['required', 'string', 'max:30'],
            'street_complement' => ['nullable', 'string', 'max:255'],
            'street_neighborhood' => ['required', 'string', 'max:255'],
            'street_city' => ['required', 'string', 'max:255'],
            'street_state' => ['required', 'string', 'size:2'],
        ];
    }

    public function messages(): array
    {
        return [
            'store_type.in' => 'Selecione um segmento valido para o fornecedor.',
            'birth_day.date' => 'Informe uma data de nascimento valida.',
            'cpf.unique' => 'Ja existe um fornecedor cadastrado com este CPF.',
            'cnpj.unique' => 'Ja existe um fornecedor cadastrado com este CNPJ.',
            'email.unique' => 'Ja existe um fornecedor cadastrado com este e-mail.',
            'password.confirmed' => 'A confirmacao da senha nao confere.',
            'street_state.size' => 'Informe a sigla do estado com 2 letras.',
        ];
    }

    public function supplierStoreTypes(): array
    {
        return [
            StoreType::GROCERY->value,
            StoreType::MAKEUP->value,
            StoreType::FURNITURE->value,
        ];
    }
}
