<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class FornecedorAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_fornecedor_login_page_is_accessible(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);

        $this->get('/fornecedor/login')
            ->assertOk()
            ->assertSee('Entrar como fornecedor');
    }

    public function test_fornecedor_can_login_and_access_import_page(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);

        $user = User::query()->create([
            'first_name' => 'Admin',
            'last_name' => 'Fornecedor',
            'slug' => 'admin-fornecedor-test',
            'email' => 'admin.fornecedor.test@example.com',
            'password' => Hash::make('password'),
            'status' => 1,
            'account_type' => 'fornecedor',
            'activity_scope' => 'fornecedor_level',
            'email_verified' => true,
        ]);

        $this->post('/fornecedor/login', [
            'email' => $user->email,
            'password' => 'password',
            'remember' => 1,
        ])
            ->assertRedirect(route('fornecedor.dashboard'));

        $this->assertAuthenticatedAs($user, 'web');

        $this->get('/fornecedor/dashboard')
            ->assertOk()
            ->assertSee('Dashboard do fornecedor');

        $this->get('/fornecedor/produtos/importar')
            ->assertOk()
            ->assertSee('Upload da planilha e imagens');
    }
}
