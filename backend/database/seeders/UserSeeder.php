<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'activity_scope' => 'system_level',
                'created_at' => '2025-04-29 00:00:00',
                'email' => 'divulgador@teste.com.br',
                'email_verified_at' => now(),
                'first_name' => 'Divulgador',
                'last_name' => 'Teste',
                'password' => Hash::make('12345678'),
                'remember_token' => null,
                'slug' => 'super-admin',
                'status' => 1,
                'store_owner' => 0,
                'stores' => null,
                'updated_at' => now(),
            ],
            [
                'activity_scope' => 'store_level',
                'created_at' => '2021-06-27 04:13:00',
                'email' => 'owner@store.com',
                'email_verified_at' => null,
                'first_name' => 'Store Admin',
                'password' => '$2y$10$oSKpyEavNDBqA29RYY1UueFB1Y0hTUXmHqQeJC9lB1gnzoVTHpVV2',
                'remember_token' => null,
                'slug' => 'store-owner',
                'status' => 1,
                'store_owner' => 1,
                'stores' => '[1,2,3,4]',
                'updated_at' => '2023-10-02 06:53:37',
            ],
            [
                'activity_scope' => 'delivery_level',
                'created_at' => '2022-03-17 16:25:39',
                'email' => 'deliveryman@demo.com',
                'email_verified_at' => null,
                'first_name' => 'Delivery Man',
                'password' => Hash::make('12345678'),
                'remember_token' => null,
                'slug' => 'delivery-man',
                'status' => 1,
                'store_owner' => 0,
                'stores' => null,
                'updated_at' => '2022-03-17 16:25:39',
            ]
        ];

        foreach ($users as $user) {
            $uniqueKeys = ['email' => $user['email']];
            if (($user['activity_scope'] ?? null) !== 'system_level') {
                $uniqueKeys = ['slug' => $user['slug']];
            }

            DB::table('users')->updateOrInsert($uniqueKeys, $user);
            if ($user['activity_scope'] === 'system_level') {
                $userId = DB::table('users')->where('slug', $user['slug'])->value('id');

                if ($userId) {
                    DB::table('model_has_roles')->updateOrInsert(
                        [
                            'model_id' => $userId,
                            'model_type' => 'App\\Models\\User',
                            'role_id' => 1,
                        ],
                        [
                            'model_id' => $userId,
                            'model_type' => 'App\\Models\\User',
                            'role_id' => 1,
                        ]
                    );
                }
            }

            if ($user['activity_scope'] === 'delivery_level') {
                $deliveryUserId = DB::table('users')
                    ->where('email', 'deliveryman@demo.com')
                    ->value('id');

                if ($deliveryUserId) {
                    DB::table('delivery_men')->updateOrInsert(
                        ['identification_number' => '123456789'],
                        [
                            'user_id' => $deliveryUserId,
                            'store_id' => 1,
                            'vehicle_type_id' => 1,
                            'area_id' => null,
                            'identification_type' => 'nid',
                            'identification_number' => '123456789',
                            'status' => 'approved',
                            'created_by' => 1,
                            'updated_by' => 1,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]
                    );
                }
            }
        }

    }
}
