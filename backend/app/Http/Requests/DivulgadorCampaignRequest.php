<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DivulgadorCampaignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isCreate = $this->isMethod('post');

        return [
            'titulo' => 'required|string|max:255',
            'objetivo' => 'required|string|max:2000',
            'meta_financeira' => 'required|numeric|min:0.01',
            'banner' => [$isCreate ? 'required' : 'nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'data_inicio' => 'required|date',
            'data_fim' => 'required|date|after_or_equal:data_inicio',
        ];
    }

    public function messages(): array
    {
        return [
            'titulo.required' => 'O título da campanha é obrigatório.',
            'objetivo.required' => 'O objetivo da campanha é obrigatório.',
            'meta_financeira.required' => 'A meta financeira é obrigatória.',
            'meta_financeira.numeric' => 'A meta financeira deve ser um valor numérico.',
            'meta_financeira.min' => 'A meta financeira deve ser maior que zero.',
            'banner.required' => 'O banner da campanha é obrigatório.',
            'banner.image' => 'O banner deve ser uma imagem válida.',
            'banner.mimes' => 'O banner deve ser jpg, jpeg, png ou webp.',
            'banner.max' => 'O banner deve ter no máximo 2MB.',
            'data_inicio.required' => 'A data inicial é obrigatória.',
            'data_inicio.date' => 'A data inicial deve ser uma data válida.',
            'data_fim.required' => 'A data final é obrigatória.',
            'data_fim.date' => 'A data final deve ser uma data válida.',
            'data_fim.after_or_equal' => 'A data final não pode ser menor que a data inicial.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Validation failed.',
            'errors' => $validator->errors(),
        ], 422));
    }
}
