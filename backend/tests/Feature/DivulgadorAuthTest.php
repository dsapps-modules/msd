<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class DivulgadorAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_divulgador_login_page_is_accessible(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);

        $this->get('/divulgador/login')
            ->assertOk()
            ->assertSee('Entrar como divulgador');
    }

    public function test_divulgador_can_login_and_access_dashboard(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);

        $user = User::query()->create([
            'first_name' => 'Admin',
            'last_name' => 'Divulgador',
            'slug' => 'admin-divulgador-test',
            'email' => 'admin.divulgador.test@example.com',
            'password' => Hash::make('password'),
            'status' => 0,
            'divulgador_status' => 'approved',
            'account_type' => 'divulgador',
            'activity_scope' => 'divulgador_level',
            'email_verified' => true,
        ]);

        $this->post('/divulgador/login', [
            'email' => $user->email,
            'password' => 'password',
            'remember' => 1,
        ])
            ->assertRedirect(route('divulgador.dashboard'));

        $this->assertAuthenticatedAs($user, 'web');

        $this->get('/divulgador/dashboard')
            ->assertOk()
            ->assertSee('Dashboard do divulgador');
    }

    public function test_pending_divulgador_is_redirected_to_analysis_page(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);

        $user = User::query()->create([
            'first_name' => 'Admin',
            'last_name' => 'Pendente',
            'slug' => 'admin-divulgador-pendente',
            'email' => 'admin.divulgador.pendente@example.com',
            'password' => Hash::make('password'),
            'status' => 0,
            'divulgador_status' => 'pending',
            'account_type' => 'divulgador',
            'activity_scope' => 'divulgador_level',
            'email_verified' => true,
        ]);

        $this->post('/divulgador/login', [
            'email' => $user->email,
            'password' => 'password',
        ])
            ->assertRedirect(route('divulgador.analisando'));
    }
}
