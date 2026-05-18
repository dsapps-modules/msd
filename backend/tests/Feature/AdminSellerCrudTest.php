<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class AdminSellerCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_list_update_change_status_and_delete_a_seller(): void
    {
        $this->withoutMiddleware();

        $email = 'seller-' . Str::lower(Str::random(10)) . '@example.com';

        $createResponse = $this->postJson('/api/v1/admin/seller/registration', [
            'first_name' => 'Maria',
            'last_name' => 'Silva',
            'phone' => '(11) 99999-9999',
            'email' => $email,
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $createResponse->assertOk();
        $createResponse->assertJsonPath('status', true);

        $seller = User::query()->where('email', $email)->firstOrFail();

        $this->getJson('/api/v1/admin/seller/list')
            ->assertOk()
            ->assertJsonFragment([
                'email' => $email,
            ]);

        $this->getJson("/api/v1/admin/seller/details/{$seller->id}")
            ->assertOk()
            ->assertJsonPath('id', $seller->id)
            ->assertJsonPath('email', $email);

        $this->postJson('/api/v1/admin/seller/update', [
            'id' => $seller->id,
            'first_name' => 'Maria Updated',
            'last_name' => 'Silva',
            'phone' => '(11) 98888-8888',
            'email' => $email,
        ])->assertOk();

        $this->assertDatabaseHas('users', [
            'id' => $seller->id,
            'first_name' => 'Maria Updated',
            'email' => $email,
        ]);

        $this->patchJson('/api/v1/admin/seller/change-status', [
            'id' => $seller->id,
            'status' => 2,
        ])->assertOk();

        $this->assertDatabaseHas('users', [
            'id' => $seller->id,
            'status' => 2,
        ]);

        $this->postJson('/api/v1/admin/seller/remove', [
            'seller_ids' => [$seller->id],
        ])->assertOk();

        $this->assertSoftDeleted('users', [
            'id' => $seller->id,
        ]);
    }
}
