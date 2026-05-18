<?php

namespace Database\Seeders;

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
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductDemoSeeder extends Seeder
{
    public function run(): void
    {
        $owner = User::query()->where('email', 'owner@store.com')->first();
        if (!$owner) {
            return;
        }

        $store = Store::query()->updateOrCreate(
            ['slug' => 'demo-owner-store'],
            [
                'area_id' => null,
                'store_seller_id' => $owner->id,
                'store_type' => StoreType::GROCERY->value,
                'tax' => 0,
                'subscription_type' => 'commission',
                'admin_commission_type' => 'percent',
                'admin_commission_amount' => 10,
                'name' => 'Demo Owner Store',
                'phone' => '11999999999',
                'email' => 'owner@store.com',
                'logo' => null,
                'banner' => null,
                'address' => 'Rua Demo, 123',
                'is_featured' => false,
                'delivery_self_system' => true,
                'delivery_take_away' => true,
                'order_minimum' => 0,
                'enable_saling' => 1,
                'status' => 1,
                'created_by' => $owner->id,
                'updated_by' => $owner->id,
            ]
        );

        $category = ProductCategory::query()->updateOrCreate(
            ['category_slug' => 'demo-grocery'],
            [
                'category_name' => 'Demo Grocery',
                'type' => 'undefined',
                'category_level' => 1,
                'is_featured' => 1,
                'admin_commission_rate' => 10,
                'meta_title' => 'Demo Grocery',
                'meta_description' => 'Demo grocery category for local CRUD testing',
                'status' => 1,
                'parent_id' => null,
                'category_name_paths' => 'Demo Grocery',
                'parent_path' => null,
            ]
        );

        $brand = ProductBrand::query()->updateOrCreate(
            ['brand_slug' => 'demo-brand'],
            [
                'brand_name' => 'Demo Brand',
                'brand_logo' => null,
                'meta_title' => 'Demo Brand',
                'meta_description' => 'Demo brand for local CRUD testing',
                'display_order' => 1,
                'seller_relation_with_brand' => null,
                'authorization_valid_from' => now(),
                'authorization_valid_to' => now()->addYear(),
                'status' => 1,
            ]
        );

        $unit = Unit::query()->updateOrCreate(
            ['name' => 'Unidade'],
            [
                'order' => 1,
            ]
        );

        $product = Product::query()->updateOrCreate(
            ['slug' => 'demo-apple-juice'],
            [
                'store_id' => $store->id,
                'category_id' => $category->id,
                'brand_id' => $brand->id,
                'unit_id' => $unit->id,
                'type' => StoreType::GROCERY->value,
                'behaviour' => Behaviour::CONSUMABLE->value,
                'name' => 'Suco de Maca 1L',
                'description' => 'Produto demo para testar o CRUD de produto.',
                'image' => null,
                'video_url' => null,
                'gallery_images' => null,
                'warranty' => null,
                'return_in_days' => null,
                'return_text' => null,
                'allow_change_in_mind' => null,
                'cash_on_delivery' => 1,
                'delivery_time_min' => null,
                'delivery_time_max' => null,
                'delivery_time_text' => null,
                'max_cart_qty' => 10,
                'order_count' => 0,
                'views' => 0,
                'status' => StatusType::APPROVED->value,
                'meta_title' => 'Suco de Maca 1L',
                'meta_description' => 'Produto demo para testes locais',
                'meta_keywords' => json_encode(['demo', 'produto', 'suco']),
                'meta_image' => null,
                'available_time_starts' => null,
                'available_time_ends' => null,
                'manufacture_date' => null,
                'expiry_date' => null,
                'is_featured' => 1,
            ]
        );

        ProductVariant::query()->updateOrCreate(
            [
                'product_id' => $product->id,
                'variant_slug' => 'suco-de-maca-1l',
            ],
            [
                'sku' => 'DEMO-' . Str::upper((string) $product->id) . '-1',
                'pack_quantity' => 1,
                'weight_major' => null,
                'weight_gross' => null,
                'weight_net' => null,
                'attributes' => json_encode([
                    'Volume' => '1L',
                ]),
                'price' => 12.90,
                'special_price' => 9.90,
                'stock_quantity' => 50,
                'unit_id' => $unit->id,
                'length' => null,
                'width' => null,
                'height' => null,
                'image' => null,
                'order_count' => 0,
                'status' => 1,
            ]
        );
    }
}
