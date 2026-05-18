<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // role & permission
        $this->call(RolesSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ModelHasRolesSeeder::class);
        $this->call(PermissionAdminSeeder::class);
        $this->call(PermissionStoreSeeder::class);
        $this->call(PermissionDeliverymanSeeder::class);
        $this->call(ProductDemoSeeder::class);
        $this->call(DivulgadorDemoSeeder::class);
        // system commission
        $this->call(SystemCommissionSeeder::class);
        $this->call(MenuSeeder::class);
    }
}
