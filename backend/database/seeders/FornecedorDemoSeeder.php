<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FornecedorDemoSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::query()->where('email', 'admin.fornecedor@teste.com')->first();
        $collaborator = User::query()->where('email', 'colaborador.fornecedor@teste.com')->first();

        if (!$admin || !$collaborator) {
            return;
        }

        $adminStore = $this->ensureStore($admin, 'admin-fornecedor-store', 'Loja Admin Fornecedor');
        $this->ensureStore($collaborator, 'colaborador-fornecedor-store', 'Loja Colaborador Fornecedor');

        $products = [
            [
                'account_id' => $admin->id,
                'store_id' => $adminStore->id,
                'codigo' => 'PROD-001',
                'name' => 'Kit Clareador Dental Premium',
                'description' => 'Kit Clareador Dental Premium',
                'altura' => 10,
                'largura' => 20,
                'comprimento' => 30,
                'peso' => 0.850,
                'embalagem' => 'Caixa',
                'valor_venda' => 249.90,
                'estoque_reservado' => 15,
            ],
            [
                'account_id' => $admin->id,
                'store_id' => $adminStore->id,
                'codigo' => 'PROD-002',
                'name' => 'Escova Elétrica SmartClean',
                'description' => 'Escova Elétrica SmartClean',
                'altura' => 8,
                'largura' => 12,
                'comprimento' => 25,
                'peso' => 0.500,
                'embalagem' => 'Caixa',
                'valor_venda' => 189.90,
                'estoque_reservado' => 8,
            ],
        ];

        foreach ($products as $productData) {
            Product::withoutGlobalScopes()->updateOrCreate(
                [
                    'account_id' => $productData['account_id'],
                    'codigo' => $productData['codigo'],
                ],
                [
                    ...$productData,
                    'slug' => Str::slug($productData['codigo'] . '-' . $productData['name'] . '-' . $productData['account_id']),
                    'status' => 'pending',
                ]
            );
        }
    }

    private function ensureStore(User $user, string $slug, string $name): Store
    {
        return Store::query()->updateOrCreate(
            ['store_seller_id' => $user->id],
            [
                'store_type' => 'grocery',
                'tax' => 0,
                'subscription_type' => 'commission',
                'admin_commission_type' => 'percent',
                'admin_commission_amount' => 10,
                'name' => $name,
                'slug' => $slug,
                'phone' => '11999990000',
                'email' => $user->email,
                'address' => 'Rua de teste, 123',
                'delivery_self_system' => true,
                'delivery_take_away' => true,
                'order_minimum' => 0,
                'enable_saling' => 1,
                'status' => 1,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ]
        );
    }
}
