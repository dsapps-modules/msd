<?php

namespace Tests\Feature;

use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class FornecedorCadastroTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_supplier_registration_page_is_accessible(): void
    {
        $this->get('/fornecedor/cadastro')
            ->assertOk()
            ->assertSee('Cadastro do fornecedor')
            ->assertSee('Enviar Cadastro para Análise');
    }

    public function test_supplier_registration_creates_pending_account_and_shows_analysis_page(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);

        $payload = [
            'store_type' => 'grocery',
            'name' => 'Bubble Inc. - Empresa de Limpeza',
            'first_name' => 'Ana',
            'last_name' => 'Bubble',
            'birth_day' => '1990-04-18',
            'cpf' => '111.444.777-35',
            'cnpj' => '04.252.011/0001-10',
            'phone' => '11988880001',
            'email' => 'nova.bubble.' . Str::lower(Str::random(6)) . '@teste.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'cep' => '01234-100',
            'street_type' => 'Rua',
            'street_name' => 'das Espumas',
            'street_number' => '120',
            'street_complement' => 'Galpao 3',
            'street_neighborhood' => 'Vila Limpa',
            'street_city' => 'Sao Paulo',
            'street_state' => 'SP',
        ];

        $response = $this->followingRedirects()->post('/fornecedor/cadastro', $payload);

        $response
            ->assertOk()
            ->assertSee('Seu cadastro está sendo analisado.')
            ->assertSee($payload['name']);

        $user = User::query()->where('email', $payload['email'])->firstOrFail();
        $store = Store::query()->where('store_seller_id', $user->id)->firstOrFail();

        $this->assertSame(0, (int) $user->status);
        $this->assertSame('pending', $store->supplier_status);
        $this->assertSame($payload['name'], $store->name);
        $this->assertSame($payload['cep'], $store->cep);
        $this->assertSame($payload['street_state'], $store->street_state);
    }
}
