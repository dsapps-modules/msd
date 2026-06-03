<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class FornecedorProductCrudTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware(ValidateCsrfToken::class);
    }

    public function test_fornecedor_authenticated_sees_only_own_products(): void
    {
        [$admin, $adminStore] = $this->makeFornecedor('fornecedor_admin', 'admin.fornecedor@teste.com');
        [$collaborator, $collaboratorStore] = $this->makeFornecedor('fornecedor_colaborador', 'colaborador.fornecedor@teste.com');

        $adminProduct = $this->makeProduct($admin, $adminStore, [
            'codigo' => 'PROD-001',
            'name' => 'Kit Clareador Dental Premium',
        ]);
        $this->makeProduct($collaborator, $collaboratorStore, [
            'codigo' => 'PROD-002',
            'name' => 'Escova Elétrica SmartClean',
        ]);

        $response = $this->actingAs($admin, 'web')->get('/fornecedor/produtos');

        $response->assertOk();
        $response->assertSeeText($adminProduct->codigo);
        $response->assertSeeText($adminProduct->name);
        $response->assertDontSeeText('PROD-002');
        $response->assertDontSeeText('Escova Elétrica SmartClean');
    }

    public function test_fornecedor_admin_can_create_product_and_product_is_bound_to_logged_supplier(): void
    {
        [$admin, $store] = $this->makeFornecedor('fornecedor_admin', 'admin.fornecedor@teste.com');

        $response = $this->actingAs($admin, 'web')->post('/fornecedor/produtos', $this->productPayload([
            'codigo' => 'PROD-001',
            'name' => 'Kit Clareador Dental Premium',
            'description' => 'Produto criado pelo admin do fornecedor',
            'altura' => 10,
            'largura' => 20,
            'comprimento' => 30,
            'peso' => 0.850,
            'embalagem' => 'Caixa',
            'valor_venda' => 249.90,
            'estoque_reservado' => 15,
        ]));

        $response->assertRedirect('/fornecedor/produtos');

        $this->assertDatabaseHas('products', [
            'account_id' => $admin->id,
            'store_id' => $store->id,
            'codigo' => 'PROD-001',
            'name' => 'Kit Clareador Dental Premium',
            'valor_venda' => '249.90',
            'estoque_reservado' => 15,
        ]);
    }

    public function test_fornecedor_colaborador_can_create_product_if_current_rule_allows_it(): void
    {
        [$collaborator, $store] = $this->makeFornecedor('fornecedor_colaborador', 'colaborador.fornecedor@teste.com');

        $response = $this->actingAs($collaborator, 'web')->post('/fornecedor/produtos', $this->productPayload([
            'codigo' => 'PROD-010',
            'name' => 'Escova Elétrica SmartClean',
            'description' => 'Produto criado pelo colaborador do fornecedor',
            'altura' => 8,
            'largura' => 12,
            'comprimento' => 25,
            'peso' => 0.500,
            'embalagem' => 'Caixa',
            'valor_venda' => 189.90,
            'estoque_reservado' => 8,
        ]));

        $response->assertRedirect('/fornecedor/produtos');

        $this->assertDatabaseHas('products', [
            'account_id' => $collaborator->id,
            'store_id' => $store->id,
            'codigo' => 'PROD-010',
            'name' => 'Escova Elétrica SmartClean',
        ]);
    }

    public function test_fornecedor_product_form_validates_required_fields(): void
    {
        [$admin] = $this->makeFornecedor('fornecedor_admin', 'admin.fornecedor@teste.com');

        $response = $this->actingAs($admin, 'web')->post('/fornecedor/produtos', []);

        $response->assertSessionHasErrors([
            'codigo',
            'name',
            'altura',
            'largura',
            'comprimento',
            'peso',
            'embalagem',
            'valor_venda',
            'estoque_reservado',
        ]);
    }

    public function test_duplicate_code_is_blocked_for_same_supplier_but_allowed_for_another_supplier(): void
    {
        [$admin, $adminStore] = $this->makeFornecedor('fornecedor_admin', 'admin.fornecedor@teste.com');
        [$collaborator, $collaboratorStore] = $this->makeFornecedor('fornecedor_colaborador', 'colaborador.fornecedor@teste.com');

        $this->makeProduct($admin, $adminStore, [
            'codigo' => 'PROD-001',
            'name' => 'Kit Clareador Dental Premium',
        ]);

        $duplicateSameSupplier = $this->actingAs($admin, 'web')->post('/fornecedor/produtos', $this->productPayload([
            'codigo' => 'PROD-001',
            'name' => 'Outro Produto',
            'description' => 'Mesmo código do fornecedor logado',
            'altura' => 11,
            'largura' => 21,
            'comprimento' => 31,
            'peso' => 0.900,
            'embalagem' => 'Caixa',
            'valor_venda' => 299.90,
            'estoque_reservado' => 7,
        ]));

        $duplicateSameSupplier->assertSessionHasErrors(['codigo']);

        $allowedOtherSupplier = $this->actingAs($collaborator, 'web')->post('/fornecedor/produtos', $this->productPayload([
            'codigo' => 'PROD-001',
            'name' => 'Kit Clareador Dental Premium',
            'description' => 'Mesmo código, outro fornecedor',
            'altura' => 10,
            'largura' => 20,
            'comprimento' => 30,
            'peso' => 0.850,
            'embalagem' => 'Caixa',
            'valor_venda' => 249.90,
            'estoque_reservado' => 15,
        ]));

        $allowedOtherSupplier->assertRedirect('/fornecedor/produtos');

        $this->assertDatabaseHas('products', [
            'account_id' => $admin->id,
            'codigo' => 'PROD-001',
        ]);

        $this->assertDatabaseHas('products', [
            'account_id' => $collaborator->id,
            'codigo' => 'PROD-001',
        ]);
    }

    public function test_fornecedor_can_view_edit_and_update_own_product(): void
    {
        [$admin, $store] = $this->makeFornecedor('fornecedor_admin', 'admin.fornecedor@teste.com');
        $product = $this->makeProduct($admin, $store, [
            'codigo' => 'PROD-001',
            'name' => 'Kit Clareador Dental Premium',
        ]);

        $this->actingAs($admin, 'web')->get("/fornecedor/produtos/{$product->id}")
            ->assertOk()
            ->assertSeeText($product->name);

        $this->actingAs($admin, 'web')->get("/fornecedor/produtos/{$product->id}/edit")
            ->assertOk()
            ->assertSeeText('Editar produto');

        $this->actingAs($admin, 'web')->put("/fornecedor/produtos/{$product->id}", $this->productPayload([
            'codigo' => 'PROD-001',
            'name' => 'Kit Clareador Dental Premium Atualizado',
            'description' => 'Produto atualizado',
            'altura' => 12,
            'largura' => 22,
            'comprimento' => 32,
            'peso' => 0.900,
            'embalagem' => 'Caixa',
            'valor_venda' => 259.90,
            'estoque_reservado' => 12,
        ]))->assertRedirect("/fornecedor/produtos/{$product->id}");

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'account_id' => $admin->id,
            'name' => 'Kit Clareador Dental Premium Atualizado',
            'valor_venda' => '259.90',
            'estoque_reservado' => 12,
        ]);
    }

    public function test_fornecedor_cannot_view_edit_or_delete_other_supplier_product(): void
    {
        [$admin, $adminStore] = $this->makeFornecedor('fornecedor_admin', 'admin.fornecedor@teste.com');
        [$collaborator, $collaboratorStore] = $this->makeFornecedor('fornecedor_colaborador', 'colaborador.fornecedor@teste.com');

        $otherProduct = $this->makeProduct($collaborator, $collaboratorStore, [
            'codigo' => 'PROD-002',
            'name' => 'Escova Elétrica SmartClean',
        ]);

        $this->actingAs($admin, 'web')->get("/fornecedor/produtos/{$otherProduct->id}")->assertStatus(404);
        $this->actingAs($admin, 'web')->get("/fornecedor/produtos/{$otherProduct->id}/edit")->assertStatus(404);
        $this->actingAs($admin, 'web')->delete("/fornecedor/produtos/{$otherProduct->id}")->assertStatus(404);
    }

    public function test_fornecedor_admin_can_delete_own_product(): void
    {
        [$admin, $store] = $this->makeFornecedor('fornecedor_admin', 'admin.fornecedor@teste.com');
        $product = $this->makeProduct($admin, $store, [
            'codigo' => 'PROD-003',
            'name' => 'Irrigador Oral Portátil',
        ]);

        $this->actingAs($admin, 'web')->delete("/fornecedor/produtos/{$product->id}")
            ->assertRedirect('/fornecedor/produtos');

        $this->assertSoftDeleted('products', [
            'id' => $product->id,
        ]);
    }

    public function test_non_fornecedor_users_are_blocked_and_guest_is_redirected_to_login(): void
    {
        $guestResponse = $this->get('/fornecedor/produtos');
        $guestResponse->assertRedirect('/login');

        $customer = $this->makeGenericUser('customer', 'customer@example.com');
        $this->actingAs($customer, 'web')->get('/fornecedor/produtos')->assertStatus(403);

        $divulgador = $this->makeGenericUser('divulgador', 'divulgador@example.com', 'divulgador_level');
        $this->actingAs($divulgador, 'web')->get('/fornecedor/produtos')->assertStatus(403);
    }

    private function makeFornecedor(string $roleName, string $email): array
    {
        $user = User::query()->create([
            'first_name' => $roleName === 'fornecedor_admin' ? 'Admin' : 'Colaborador',
            'last_name' => 'Fornecedor',
            'slug' => Str::slug($roleName . '-' . Str::random(8)),
            'phone' => '11999990000',
            'email' => $email,
            'email_verified' => true,
            'password' => bcrypt('password'),
            'activity_scope' => 'fornecedor_level',
            'account_type' => 'fornecedor',
            'status' => 1,
        ]);

        $role = Role::findOrCreate($roleName, 'api');
        $user->assignRole($role);

        $store = Store::query()->create([
            'store_seller_id' => $user->id,
            'store_type' => 'grocery',
            'tax' => 0,
            'subscription_type' => 'commission',
            'admin_commission_type' => 'percent',
            'admin_commission_amount' => 10,
            'name' => $roleName === 'fornecedor_admin' ? 'Loja Admin Fornecedor' : 'Loja Colaborador Fornecedor',
            'slug' => Str::slug($roleName . '-store-' . Str::random(8)),
            'phone' => '11999990000',
            'email' => $email,
            'address' => 'Rua Teste, 100',
            'delivery_self_system' => true,
            'delivery_take_away' => true,
            'order_minimum' => 0,
            'enable_saling' => 1,
            'status' => 1,
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        return [$user, $store];
    }

    private function makeGenericUser(string $prefix, string $email, string $activityScope = 'customer_level'): User
    {
        return User::query()->create([
            'first_name' => ucfirst($prefix),
            'last_name' => 'Teste',
            'slug' => Str::slug($prefix . '-' . Str::random(8)),
            'phone' => '11999990000',
            'email' => $email,
            'email_verified' => true,
            'password' => bcrypt('password'),
            'activity_scope' => $activityScope,
            'account_type' => $prefix === 'divulgador' ? 'divulgador' : 'customer',
            'status' => 1,
        ]);
    }

    private function makeProduct(User $user, Store $store, array $overrides = []): Product
    {
        return Product::withoutGlobalScopes()->create(array_merge([
            'store_id' => $store->id,
            'account_id' => $user->id,
            'codigo' => 'PROD-' . Str::upper(Str::random(3)),
            'name' => 'Produto ' . Str::random(6),
            'description' => 'Descrição de teste',
            'altura' => 10,
            'largura' => 20,
            'comprimento' => 30,
            'peso' => 0.850,
            'embalagem' => 'Caixa',
            'valor_venda' => 249.90,
            'estoque_reservado' => 15,
            'slug' => Str::slug(Str::random(16)),
            'status' => 'pending',
        ], $overrides));
    }

    private function productPayload(array $overrides = []): array
    {
        return array_merge([
            'codigo' => 'PROD-001',
            'name' => 'Kit Clareador Dental Premium',
            'description' => 'Produto de teste',
            'altura' => 10,
            'largura' => 20,
            'comprimento' => 30,
            'peso' => 0.850,
            'embalagem' => 'Caixa',
            'valor_venda' => 249.90,
            'estoque_reservado' => 15,
        ], $overrides);
    }
}
