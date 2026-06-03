<?php

namespace Database\Seeders;

use App\Enums\Behaviour;
use App\Enums\StatusType;
use App\Enums\StoreType;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Store;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class FornecedorDemoSeeder extends Seeder
{
    public function run(): void
    {
        $unit = Unit::query()->firstOrCreate(
            ['name' => 'Unidade'],
            ['order' => 1]
        );

        foreach ($this->suppliers() as $supplier) {
            $user = $this->ensureUser($supplier);
            $store = $this->ensureStore($user, $supplier);

            foreach ($supplier['products'] as $index => $productData) {
                $this->ensureProduct($user, $store, $unit, $supplier, $productData, $index);
            }
        }
    }

    private function suppliers(): array
    {
        return [
            [
                'name' => 'Bubble Inc. - Empresa de Limpeza',
                'slug' => 'bubble-inc-empresa-de-limpeza',
                'email' => 'admin.bubble@teste.com',
                'first_name' => 'Ana',
                'last_name' => 'Bubble',
                'birth_day' => '1990-04-18',
                'cpf' => '111.444.777-35',
                'cnpj' => '04.252.011/0001-10',
                'phone' => '11988880001',
                'store_type' => StoreType::GROCERY,
                'address' => [
                    'cep' => '01234-100',
                    'street_type' => 'Rua',
                    'street_name' => 'das Espumas',
                    'street_number' => '120',
                    'street_complement' => 'Galpao 3',
                    'street_neighborhood' => 'Vila Limpa',
                    'street_city' => 'Sao Paulo',
                    'street_state' => 'SP',
                ],
                'supplier_status' => 'approved',
                'products' => [
                    ['codigo' => 'BUB-001', 'name' => 'Limpador Multiuso Citrus 500ml', 'description' => 'Limpador multiuso para cozinha, banheiro e superfícies laváveis.', 'peso' => 0.55, 'altura' => 20, 'largura' => 8, 'comprimento' => 8, 'price' => 19.90, 'stock' => 120],
                    ['codigo' => 'BUB-002', 'name' => 'Sabao Liquido Neutro 1L', 'description' => 'Sabao liquido neutro com alto rendimento para limpeza diária.', 'peso' => 1.10, 'altura' => 28, 'largura' => 10, 'comprimento' => 10, 'price' => 27.90, 'stock' => 95],
                    ['codigo' => 'BUB-003', 'name' => 'Desinfetante Floral 2L', 'description' => 'Desinfetante perfumado para higienizacao de ambientes.', 'peso' => 2.20, 'altura' => 32, 'largura' => 12, 'comprimento' => 12, 'price' => 24.50, 'stock' => 80],
                    ['codigo' => 'BUB-004', 'name' => 'Esponja Anti-Risco Duo', 'description' => 'Kit com duas esponjas para limpeza pesada sem arranhar.', 'peso' => 0.08, 'altura' => 12, 'largura' => 10, 'comprimento' => 4, 'price' => 9.90, 'stock' => 250],
                    ['codigo' => 'BUB-005', 'name' => 'Kit Banheiro Brilho Total', 'description' => 'Conjunto com itens para limpeza completa do banheiro.', 'peso' => 1.85, 'altura' => 26, 'largura' => 18, 'comprimento' => 18, 'price' => 64.90, 'stock' => 60],
                ],
            ],
            [
                'name' => 'Wigs 4 Chicks - Empresa de produto de cabelo',
                'slug' => 'wigs-4-chicks-empresa-de-produto-de-cabelo',
                'email' => 'admin.wigs4chicks@teste.com',
                'first_name' => 'Bruna',
                'last_name' => 'Wigs',
                'birth_day' => '1988-09-03',
                'cpf' => '390.533.447-05',
                'cnpj' => '18.300.650/0001-82',
                'phone' => '11988880002',
                'store_type' => StoreType::MAKEUP,
                'address' => [
                    'cep' => '04567-200',
                    'street_type' => 'Av.',
                    'street_name' => 'dos Cachos',
                    'street_number' => '450',
                    'street_complement' => 'Sala 12',
                    'street_neighborhood' => 'Jardim Beleza',
                    'street_city' => 'Sao Paulo',
                    'street_state' => 'SP',
                ],
                'supplier_status' => 'pending',
                'products' => [
                    ['codigo' => 'WIG-001', 'name' => 'Shampoo Fortalecedor para Lace', 'description' => 'Shampoo suave para limpeza e manutenção de wigs e lace fronts.', 'peso' => 0.48, 'altura' => 19, 'largura' => 7, 'comprimento' => 7, 'price' => 34.90, 'stock' => 110],
                    ['codigo' => 'WIG-002', 'name' => 'Mascara Reconstrutora Silk Wave', 'description' => 'Máscara nutritiva para restaurar brilho e maciez aos fios.', 'peso' => 0.62, 'altura' => 21, 'largura' => 8, 'comprimento' => 8, 'price' => 49.90, 'stock' => 85],
                    ['codigo' => 'WIG-003', 'name' => 'Oleo Finalizador Brilho Supreme', 'description' => 'Oleo leve para acabamento, brilho e controle de frizz.', 'peso' => 0.18, 'altura' => 14, 'largura' => 5, 'comprimento' => 5, 'price' => 39.90, 'stock' => 140],
                    ['codigo' => 'WIG-004', 'name' => 'Touca Protetora Satin Care', 'description' => 'Touca de cetim para proteger e preservar o penteado durante a noite.', 'peso' => 0.05, 'altura' => 3, 'largura' => 15, 'comprimento' => 20, 'price' => 22.90, 'stock' => 210],
                    ['codigo' => 'WIG-005', 'name' => 'Spray Fixador de Cachos', 'description' => 'Spray leve para fixação sem pesar nos fios.', 'peso' => 0.29, 'altura' => 18, 'largura' => 6, 'comprimento' => 6, 'price' => 29.90, 'stock' => 130],
                ],
            ],
            [
                'name' => 'Cozinha Afetiva - Empresa de produto de cozinha',
                'slug' => 'cozinha-afetiva-empresa-de-produto-de-cozinha',
                'email' => 'admin.cozinhaafetiva@teste.com',
                'first_name' => 'Carla',
                'last_name' => 'Afetiva',
                'birth_day' => '1992-01-27',
                'cpf' => '529.982.247-25',
                'cnpj' => '22.444.333/0001-09',
                'phone' => '11988880003',
                'store_type' => StoreType::GROCERY,
                'address' => [
                    'cep' => '01010-000',
                    'street_type' => 'Rua',
                    'street_name' => 'do Fogao',
                    'street_number' => '88',
                    'street_complement' => 'Bloco B',
                    'street_neighborhood' => 'Centro',
                    'street_city' => 'Sao Paulo',
                    'street_state' => 'SP',
                ],
                'supplier_status' => 'approved',
                'products' => [
                    ['codigo' => 'COZ-001', 'name' => 'Frigideira Antiaderente 24cm', 'description' => 'Frigideira resistente para uso diário com revestimento antiaderente.', 'peso' => 0.92, 'altura' => 8, 'largura' => 24, 'comprimento' => 42, 'price' => 79.90, 'stock' => 70],
                    ['codigo' => 'COZ-002', 'name' => 'Conjunto de Potes Hermeticos', 'description' => 'Kit com potes para organização de alimentos e marmitas.', 'peso' => 1.40, 'altura' => 18, 'largura' => 22, 'comprimento' => 28, 'price' => 89.90, 'stock' => 65],
                    ['codigo' => 'COZ-003', 'name' => 'Colher de Pau Premium', 'description' => 'Colher de madeira para preparo de receitas caseiras.', 'peso' => 0.11, 'altura' => 2, 'largura' => 6, 'comprimento' => 34, 'price' => 14.90, 'stock' => 180],
                    ['codigo' => 'COZ-004', 'name' => 'Kit Facas Gourmet 5 Pecas', 'description' => 'Conjunto versátil de facas para corte e preparo na cozinha.', 'peso' => 1.75, 'altura' => 6, 'largura' => 14, 'comprimento' => 38, 'price' => 129.90, 'stock' => 45],
                    ['codigo' => 'COZ-005', 'name' => 'Jogo de Panos e Guardanapos', 'description' => 'Jogo completo para mesa posta e rotina da cozinha.', 'peso' => 0.34, 'altura' => 4, 'largura' => 18, 'comprimento' => 24, 'price' => 39.90, 'stock' => 150],
                ],
            ],
            [
                'name' => 'Madeira & Machado - Empresa de moveis de madeira macica',
                'slug' => 'madeira-machado-empresa-de-moveis-de-madeira-macica',
                'email' => 'admin.madeiraemachado@teste.com',
                'first_name' => 'Diego',
                'last_name' => 'Machado',
                'birth_day' => '1985-11-12',
                'cpf' => '745.897.610-90',
                'cnpj' => '33.555.444/0001-21',
                'phone' => '11988880004',
                'store_type' => StoreType::FURNITURE,
                'address' => [
                    'cep' => '09990-300',
                    'street_type' => 'Estrada',
                    'street_name' => 'do Cedro',
                    'street_number' => '900',
                    'street_complement' => 'Galpao 7',
                    'street_neighborhood' => 'Distrito Industrial',
                    'street_city' => 'Sao Paulo',
                    'street_state' => 'SP',
                ],
                'supplier_status' => 'rejected',
                'products' => [
                    ['codigo' => 'MAD-001', 'name' => 'Mesa de Centro Carvalho', 'description' => 'Mesa de centro em madeira macica com acabamento natural.', 'peso' => 18.50, 'altura' => 42, 'largura' => 70, 'comprimento' => 120, 'price' => 899.90, 'stock' => 12],
                    ['codigo' => 'MAD-002', 'name' => 'Aparador Rustico', 'description' => 'Aparador robusto para sala ou corredor com desenho rustico.', 'peso' => 24.00, 'altura' => 85, 'largura' => 40, 'comprimento' => 140, 'price' => 1299.90, 'stock' => 10],
                    ['codigo' => 'MAD-003', 'name' => 'Banco de Madeira Macica', 'description' => 'Banco resistente para jantar, varanda ou uso decorativo.', 'peso' => 11.20, 'altura' => 48, 'largura' => 35, 'comprimento' => 100, 'price' => 399.90, 'stock' => 24],
                    ['codigo' => 'MAD-004', 'name' => 'Estante Modular', 'description' => 'Estante modular para livros e objetos decorativos.', 'peso' => 31.60, 'altura' => 180, 'largura' => 30, 'comprimento' => 90, 'price' => 1599.90, 'stock' => 8],
                    ['codigo' => 'MAD-005', 'name' => 'Cabeceira Queen Madeira', 'description' => 'Cabeceira queen em madeira macica para quarto sofisticado.', 'peso' => 16.80, 'altura' => 120, 'largura' => 8, 'comprimento' => 160, 'price' => 799.90, 'stock' => 15],
                ],
            ],
            [
                'name' => 'Atelie do Lar - Empresa de utilidades domesticas',
                'slug' => 'atelie-do-lar-empresa-de-utilidades-domesticas',
                'email' => 'admin.ateliedolar@teste.com',
                'first_name' => 'Elisa',
                'last_name' => 'Lar',
                'birth_day' => '1991-06-08',
                'cpf' => '604.982.311-80',
                'cnpj' => '44.666.555/0001-73',
                'phone' => '11988880005',
                'store_type' => StoreType::GROCERY,
                'address' => [
                    'cep' => '02345-900',
                    'street_type' => 'Rua',
                    'street_name' => 'dos Organizados',
                    'street_number' => '210',
                    'street_complement' => 'Casa 2',
                    'street_neighborhood' => 'Bairro Harmonia',
                    'street_city' => 'Sao Paulo',
                    'street_state' => 'SP',
                ],
                'supplier_status' => 'pending',
                'products' => [
                    ['codigo' => 'LAR-001', 'name' => 'Bandeja de Servir Bambu', 'description' => 'Bandeja leve e resistente para servir e organizar.', 'peso' => 0.74, 'altura' => 4, 'largura' => 30, 'comprimento' => 45, 'price' => 54.90, 'stock' => 90],
                    ['codigo' => 'LAR-002', 'name' => 'Cesto Organizadora Tecido', 'description' => 'Cesto dobravel para closet, lavanderia ou sala.', 'peso' => 0.52, 'altura' => 28, 'largura' => 32, 'comprimento' => 32, 'price' => 44.90, 'stock' => 100],
                    ['codigo' => 'LAR-003', 'name' => 'Sousplat Artesanal', 'description' => 'Conjunto para mesa posta com acabamento artesanal.', 'peso' => 0.60, 'altura' => 5, 'largura' => 35, 'comprimento' => 35, 'price' => 69.90, 'stock' => 75],
                    ['codigo' => 'LAR-004', 'name' => 'Porta Temperos de Madeira', 'description' => 'Organizador para temperos e condimentos na cozinha.', 'peso' => 1.15, 'altura' => 22, 'largura' => 12, 'comprimento' => 30, 'price' => 84.90, 'stock' => 58],
                    ['codigo' => 'LAR-005', 'name' => 'Jogo Americano de Algodao', 'description' => 'Jogo americano para mesa posta com toque aconchegante.', 'peso' => 0.28, 'altura' => 3, 'largura' => 18, 'comprimento' => 30, 'price' => 34.90, 'stock' => 160],
                ],
            ],
        ];
    }

    private function ensureUser(array $supplier): User
    {
        $user = User::query()->updateOrCreate(
            ['email' => $supplier['email']],
            [
                'activity_scope' => 'fornecedor_level',
                'account_type' => 'fornecedor',
                'created_at' => now(),
                'birth_day' => $supplier['birth_day'],
                'cpf' => $supplier['cpf'],
                'email_verified_at' => now(),
                'first_name' => $supplier['first_name'],
                'last_name' => $supplier['last_name'],
                'password' => Hash::make('password'),
                'remember_token' => null,
                'slug' => $supplier['slug'] . '-admin',
                'status' => 1,
                'store_owner' => 0,
                'stores' => null,
                'updated_at' => now(),
            ]
        );

        $role = Role::query()
            ->where('name', 'fornecedor_admin')
            ->where('guard_name', 'api')
            ->first();

        if ($role) {
            $user->syncRoles([$role->name]);
        }

        return $user;
    }

    private function ensureStore(User $user, array $supplier): Store
    {
        return Store::query()->updateOrCreate(
            ['store_seller_id' => $user->id],
            [
                'store_type' => $supplier['store_type']->value,
                'tax' => 0,
                'subscription_type' => 'commission',
                'admin_commission_type' => 'percent',
                'admin_commission_amount' => 10,
                'name' => $supplier['name'],
                'slug' => $supplier['slug'],
                'cnpj' => $supplier['cnpj'],
                'phone' => $supplier['phone'],
                'email' => $user->email,
                'cep' => $supplier['address']['cep'],
                'street_type' => $supplier['address']['street_type'],
                'street_name' => $supplier['address']['street_name'],
                'street_number' => $supplier['address']['street_number'],
                'street_complement' => $supplier['address']['street_complement'],
                'street_neighborhood' => $supplier['address']['street_neighborhood'],
                'street_city' => $supplier['address']['street_city'],
                'street_state' => $supplier['address']['street_state'],
                'address' => $this->buildFullAddress($supplier['address']),
                'supplier_status' => $supplier['supplier_status'] ?? 'pending',
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

    private function buildFullAddress(array $address): string
    {
        $parts = array_filter([
            trim(($address['street_type'] ?? '') . ' ' . ($address['street_name'] ?? '')),
            $address['street_number'] ?? null,
            $address['street_complement'] ?? null,
            $address['street_neighborhood'] ?? null,
            trim(($address['street_city'] ?? '') . '/' . ($address['street_state'] ?? '')),
            $address['cep'] ?? null,
        ]);

        return implode(', ', $parts);
    }

    private function ensureProduct(User $user, Store $store, Unit $unit, array $supplier, array $productData, int $index): Product
    {
        $product = Product::withoutGlobalScopes()->updateOrCreate(
            [
                'account_id' => $user->id,
                'codigo' => $productData['codigo'],
            ],
            [
                'store_id' => $store->id,
                'account_id' => $user->id,
                'category_id' => null,
                'brand_id' => null,
                'unit_id' => $unit->id,
                'type' => $supplier['store_type']->value,
                'behaviour' => Behaviour::PHYSICAL->value,
                'name' => $productData['name'],
                'slug' => Str::slug($supplier['slug'] . '-' . $productData['codigo'] . '-' . $productData['name']),
                'description' => $productData['description'],
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
                'meta_title' => $productData['name'],
                'meta_description' => $productData['description'],
                'meta_keywords' => json_encode([
                    Str::slug($supplier['name']),
                    Str::slug($productData['name']),
                    'demo',
                ]),
                'meta_image' => null,
                'available_time_starts' => null,
                'available_time_ends' => null,
                'manufacture_date' => null,
                'expiry_date' => null,
                'is_featured' => $index === 0 ? 1 : 0,
                'altura' => $productData['altura'],
                'largura' => $productData['largura'],
                'comprimento' => $productData['comprimento'],
                'peso' => $productData['peso'],
                'embalagem' => 'Caixa',
                'valor_venda' => $productData['price'],
                'estoque_reservado' => $productData['stock'],
            ]
        );

        ProductVariant::query()->updateOrCreate(
            [
                'product_id' => $product->id,
                'variant_slug' => Str::slug($productData['codigo'] . '-' . $productData['name']),
            ],
            [
                'sku' => 'DEMO-' . Str::upper($productData['codigo']),
                'pack_quantity' => 1,
                'weight_major' => $productData['peso'],
                'weight_gross' => $productData['peso'],
                'weight_net' => $productData['peso'],
                'attributes' => json_encode([
                    'Padrao' => 'Sim',
                ]),
                'price' => $productData['price'],
                'special_price' => null,
                'stock_quantity' => $productData['stock'],
                'unit_id' => $unit->id,
                'length' => $productData['comprimento'],
                'width' => $productData['largura'],
                'height' => $productData['altura'],
                'image' => null,
                'order_count' => 0,
                'status' => 1,
            ]
        );

        return $product;
    }
}
