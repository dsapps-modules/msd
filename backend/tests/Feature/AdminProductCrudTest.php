<?php

namespace Tests\Feature;

use App\Enums\Behaviour;
use App\Enums\StatusType;
use App\Enums\StoreType;
use App\Models\Product;
use App\Models\ProductBrand;
use App\Models\ProductCategory;
use App\Models\ProductVariant;
use App\Models\Store;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class AdminProductCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_list_update_and_delete_a_product(): void
    {
        $this->withoutMiddleware();

        $seller = User::query()->create([
            'first_name' => 'Demo',
            'last_name' => 'Seller',
            'slug' => 'demo-seller',
            'email' => 'seller-' . Str::lower(Str::random(8)) . '@example.com',
            'password' => 'password123',
            'activity_scope' => 'store_level',
            'status' => 1,
            'store_owner' => 1,
            'stores' => null,
        ]);

        $store = Store::query()->create([
            'store_seller_id' => $seller->id,
            'store_type' => StoreType::GROCERY->value,
            'tax' => 0,
            'subscription_type' => 'commission',
            'admin_commission_type' => 'percent',
            'admin_commission_amount' => 10,
            'name' => 'Demo Store',
            'slug' => 'demo-store',
            'status' => 1,
            'enable_saling' => 1,
        ]);

        $category = ProductCategory::query()->create([
            'category_name' => 'Demo Category',
            'category_slug' => 'demo-category',
            'type' => 'undefined',
            'category_level' => 1,
            'is_featured' => 1,
            'admin_commission_rate' => 10,
            'meta_title' => 'Demo Category',
            'meta_description' => 'Demo category',
            'status' => 1,
        ]);

        $brand = ProductBrand::query()->create([
            'brand_name' => 'Demo Brand',
            'brand_slug' => 'demo-brand',
            'display_order' => 1,
            'meta_title' => 'Demo Brand',
            'meta_description' => 'Demo brand',
            'status' => 1,
        ]);

        $unit = Unit::query()->create([
            'name' => 'Unidade',
            'order' => 1,
        ]);

        $createResponse = $this->postJson('/api/v1/admin/product/add', [
            'store_id' => $store->id,
            'category_id' => $category->id,
            'brand_id' => $brand->id,
            'unit_id' => $unit->id,
            'name' => 'Produto Demo',
            'description' => 'Produto criado no teste',
            'type' => StoreType::GROCERY->value,
            'behaviour' => Behaviour::CONSUMABLE->value,
            'status' => StatusType::APPROVED->value,
            'variants' => [
                [
                    'variant' => 'Default',
                    'price' => 20,
                    'special_price' => 15,
                    'stock_quantity' => 25,
                    'unit_id' => $unit->id,
                    'attributes' => [
                        'Volume' => '1L',
                    ],
                    'status' => 1,
                ],
            ],
        ]);

        $createResponse->assertOk();
        $createResponse->assertJsonPath('success', true);

        $product = Product::query()->with('variants')->where('slug', 'produto-demo')->firstOrFail();
        $variant = $product->variants->firstOrFail();

        $this->getJson('/api/v1/admin/product/list')
            ->assertOk()
            ->assertJsonFragment([
                'id' => $product->id,
                'name' => 'Produto Demo',
            ]);

        $this->putJson('/api/v1/admin/product/update', [
            'id' => $product->id,
            'store_id' => $store->id,
            'category_id' => $category->id,
            'brand_id' => $brand->id,
            'unit_id' => $unit->id,
            'name' => 'Produto Demo Atualizado',
            'description' => 'Produto atualizado no teste',
            'type' => StoreType::GROCERY->value,
            'behaviour' => Behaviour::CONSUMABLE->value,
            'status' => StatusType::APPROVED->value,
            'variants' => [
                [
                    'id' => $variant->id,
                    'variant' => 'Default',
                    'price' => 24,
                    'special_price' => 18,
                    'stock_quantity' => 20,
                    'unit_id' => $unit->id,
                    'attributes' => [
                        'Volume' => '1L',
                    ],
                    'status' => 1,
                ],
            ],
        ])->assertOk();

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Produto Demo Atualizado',
        ]);

        $this->assertDatabaseHas('product_variants', [
            'id' => $variant->id,
            'product_id' => $product->id,
            'price' => 24,
            'special_price' => 18,
        ]);

        $this->deleteJson("/api/v1/admin/product/remove/{$product->id}")
            ->assertOk()
            ->assertJsonPath('success', true);

        $this->assertSoftDeleted('products', [
            'id' => $product->id,
        ]);
    }
}
