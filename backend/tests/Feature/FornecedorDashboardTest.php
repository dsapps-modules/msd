<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Tests\TestCase;
use Illuminate\Support\Str;

class FornecedorDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_fornecedor_admin_can_view_dashboard_with_financial_area(): void
    {
        $user = $this->makeFornecedorUser('fornecedor-admin', 'fornecedor_admin');

        $response = $this->actingAs($user, 'web')->get('/fornecedor/dashboard');

        $response->assertOk();
        $response->assertSee('Dashboard do fornecedor');
        $response->assertSee('Valor total vendido');
        $response->assertSee('Valor a receber');
    }

    public function test_fornecedor_colaborador_cannot_see_financial_area(): void
    {
        $user = $this->makeFornecedorUser('fornecedor-colaborador', 'fornecedor_colaborador');

        $response = $this->actingAs($user, 'web')->get('/fornecedor/dashboard');

        $response->assertOk();
        $response->assertSee('Dashboard do fornecedor');
        $response->assertDontSee('Valor a receber');
        $response->assertDontSee('Valor total vendido');
    }

    public function test_non_fornecedor_is_blocked_from_dashboard(): void
    {
        $user = User::query()->create([
            'first_name' => 'Cliente',
            'last_name' => 'Comum',
            'slug' => Str::slug('cliente-comum-' . Str::random(6)),
            'phone' => '11999990000',
            'email' => 'cliente-' . Str::random(4) . '@example.com',
            'email_verified' => true,
            'password' => bcrypt('password'),
            'activity_scope' => 'customer_level',
            'account_type' => 'customer',
            'status' => 1,
        ]);

        $response = $this->actingAs($user, 'web')->get('/fornecedor/dashboard');

        $response->assertStatus(403);
    }

    private function makeFornecedorUser(string $emailPrefix, string $roleName): User
    {
        $role = Role::findOrCreate($roleName, 'api');

        $user = User::query()->create([
            'first_name' => 'Fornecedor',
            'last_name' => ucfirst(str_replace('_', ' ', $roleName)),
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
        DB::table('model_has_roles')->updateOrInsert(
            [
                'model_id' => $user->id,
                'model_type' => User::class,
                'role_id' => $role->id,
            ],
            [
                'model_id' => $user->id,
                'model_type' => User::class,
                'role_id' => $role->id,
            ]
        );

        return $user;
    }
}
