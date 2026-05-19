<?php

namespace Tests\Feature;

use App\Enums\StoreType;
use App\Models\Store;
use App\Models\StoreSeller;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class AdminStoreAndUnitCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_list_filter_update_and_delete_stores(): void
    {
        $this->withoutMiddleware();

        $sellerOne = $this->createSeller('Loja', 'Um');
        $sellerTwo = $this->createSeller('Loja', 'Dois');

        $storeSlug = 'store-' . Str::lower(Str::random(8));
        $otherStoreSlug = 'store-' . Str::lower(Str::random(8));

        $createResponse = $this->postJson('/api/v1/admin/store/add', [
            'store_seller_id' => $sellerOne->id,
            'store_type' => StoreType::GROCERY->value,
            'name' => 'Loja Central',
            'slug' => $storeSlug,
            'phone' => '(11) 99999-1111',
            'email' => 'loja-central@example.com',
            'tax' => 10,
            'latitude' => -23.55052,
            'longitude' => -46.633308,
            'translations' => [],
        ]);

        $createResponse->assertOk();
        $createResponse->assertJsonPath('success', true);

        $store = Store::query()->where('slug', $storeSlug)->firstOrFail();

        $this->assertDatabaseHas('stores', [
            'id' => $store->id,
            'store_seller_id' => $sellerOne->id,
            'status' => 1,
        ]);

        $this->postJson('/api/v1/admin/store/add', [
            'store_seller_id' => $sellerTwo->id,
            'store_type' => StoreType::BAKERY->value,
            'name' => 'Padaria Bairro',
            'slug' => $otherStoreSlug,
            'phone' => '(11) 98888-2222',
            'email' => 'padaria@example.com',
            'tax' => 5,
            'latitude' => -23.551,
            'longitude' => -46.63,
            'translations' => [],
        ])->assertOk();

        $this->getJson('/api/v1/admin/store/list?seller=' . $sellerOne->id)
            ->assertOk()
            ->assertJsonFragment([
                'slug' => $storeSlug,
            ])
            ->assertJsonMissing([
                'slug' => $otherStoreSlug,
            ]);

        $this->getJson("/api/v1/admin/store/details/{$store->id}")
            ->assertOk()
            ->assertJsonPath('id', $store->id)
            ->assertJsonPath('slug', $storeSlug);

        $this->postJson('/api/v1/admin/store/update', [
            'id' => $store->id,
            'store_seller_id' => $sellerOne->id,
            'store_type' => StoreType::GROCERY->value,
            'name' => 'Loja Central Atualizada',
            'slug' => $storeSlug,
            'phone' => '(11) 97777-3333',
            'email' => 'loja-central@example.com',
            'subscription_type' => 'commission',
            'tax' => 12,
            'latitude' => -23.55052,
            'longitude' => -46.633308,
            'translations' => [],
        ])->assertOk();

        $this->assertDatabaseHas('stores', [
            'id' => $store->id,
            'name' => 'Loja Central Atualizada',
        ]);

        $this->deleteJson("/api/v1/admin/store/remove/{$store->id}")
            ->assertOk()
            ->assertJsonPath('success', true);

        $this->assertSoftDeleted('stores', [
            'id' => $store->id,
        ]);
    }

    public function test_admin_can_create_list_update_and_delete_units(): void
    {
        $this->withoutMiddleware();

        $unitName = 'Unidade ' . Str::upper(Str::random(5));
        $otherUnitName = 'Unidade ' . Str::upper(Str::random(5));

        $createResponse = $this->postJson('/api/v1/admin/unit/add', [
            'name' => $unitName,
            'order' => 1,
            'translations' => [],
        ]);

        $createResponse->assertOk();
        $createResponse->assertJsonPath('success', true);

        $unit = Unit::query()->where('name', $unitName)->firstOrFail();

        $this->postJson('/api/v1/admin/unit/add', [
            'name' => $otherUnitName,
            'order' => 2,
            'translations' => [],
        ])->assertOk();

        $this->getJson('/api/v1/admin/unit/list?language=en')
            ->assertOk()
            ->assertJsonFragment([
                'name' => $unitName,
            ]);

        $this->getJson("/api/v1/admin/unit/details/{$unit->id}")
            ->assertOk()
            ->assertJsonPath('id', $unit->id)
            ->assertJsonPath('name', $unitName);

        $this->postJson('/api/v1/admin/unit/update', [
            'id' => $unit->id,
            'name' => $unitName . ' Atualizada',
            'order' => 3,
            'translations' => [],
        ])->assertOk();

        $this->assertDatabaseHas('units', [
            'id' => $unit->id,
            'name' => $unitName . ' Atualizada',
            'order' => 3,
        ]);

        $this->deleteJson("/api/v1/admin/unit/remove/{$unit->id}")
            ->assertOk()
            ->assertJsonPath('success', true);

        $this->assertDatabaseMissing('units', [
            'id' => $unit->id,
        ]);
    }

    private function createSeller(string $firstName, string $lastName): User
    {
        $user = User::query()->create([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'slug' => Str::slug($firstName . ' ' . $lastName . ' ' . Str::random(6)),
            'phone' => '11999990000',
            'email' => strtolower($firstName . '.' . $lastName . '.' . Str::random(4)) . '@example.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password123'),
            'activity_scope' => 'store_level',
            'store_owner' => 1,
            'stores' => [],
            'status' => 1,
        ]);

        StoreSeller::query()->create([
            'user_id' => $user->id,
            'status' => 1,
        ]);

        return $user;
    }
}
