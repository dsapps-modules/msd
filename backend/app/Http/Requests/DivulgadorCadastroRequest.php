<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DivulgadorCadastroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'birth_day' => ['required', 'date'],
            'cpf' => ['required', 'string', 'max:14', Rule::unique('users', 'cpf')],
            'cnpj' => ['nullable', 'string', 'max:18', Rule::unique('users', 'cnpj')],
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
            'birth_day.date' => 'Informe uma data de nascimento válida.',
            'cpf.unique' => 'Já existe um divulgador cadastrado com este CPF.',
            'cnpj.unique' => 'Já existe um divulgador cadastrado com este CNPJ.',
            'email.unique' => 'Já existe um divulgador cadastrado com este e-mail.',
            'password.confirmed' => 'A confirmação da senha não confere.',
            'street_state.size' => 'Informe a sigla do estado com 2 letras.',
        ];
    }
}
