<?php

namespace Database\Seeders;

use App\Models\DivulgadorBuyer;
use App\Models\DivulgadorCampaign;
use App\Models\DivulgadorDonation;
use App\Models\DivulgadorLink;
use App\Models\DivulgadorProduct;
use App\Models\User;
use Illuminate\Database\Seeder;

class DivulgadorDemoSeeder extends Seeder
{
    public function run(): void
    {
        $accountCode = 'demo-divulgador';
        $divulgadorId = User::query()
            ->where('divulgador_account_code', $accountCode)
            ->value('id');

        $products = [
            ['name' => 'Kit Clareador Dental Premium', 'supplier_name' => 'Dental Shop Brasil', 'price' => 189.90, 'stock' => 42, 'status' => 'Ativo'],
            ['name' => 'Escova Elétrica SmartClean', 'supplier_name' => 'Oral Prime', 'price' => 249.90, 'stock' => 18, 'status' => 'Ativo'],
            ['name' => 'Irrigador Oral Portátil', 'supplier_name' => 'Sorriso Distribuidora', 'price' => 329.90, 'stock' => 11, 'status' => 'Ativo'],
            ['name' => 'Creme Dental Sensitive Pro', 'supplier_name' => 'Dental Shop Brasil', 'price' => 39.90, 'stock' => 86, 'status' => 'Ativo'],
            ['name' => 'Fio Dental Expansível', 'supplier_name' => 'Oral Prime', 'price' => 24.90, 'stock' => 104, 'status' => 'Ativo'],
        ];

        $productModels = [];

        foreach ($products as $product) {
            $productModels[] = DivulgadorProduct::query()->updateOrCreate(
                [
                    'account_code' => $accountCode,
                    'name' => $product['name'],
                ],
                [
                    'supplier_name' => $product['supplier_name'],
                    'price' => $product['price'],
                    'stock' => $product['stock'],
                    'status' => $product['status'],
                ]
            );
        }

        $buyers = [
            ['name' => 'Mariana Lopes', 'email' => 'mariana@email.com', 'phone' => '(11) 98888-1111', 'product_index' => 0],
            ['name' => 'Carlos Mendes', 'email' => 'carlos@email.com', 'phone' => '(21) 97777-2222', 'product_index' => 1],
            ['name' => 'Fernanda Rocha', 'email' => 'fernanda@email.com', 'phone' => '(31) 96666-3333', 'product_index' => 2],
            ['name' => 'João Almeida', 'email' => 'joao@email.com', 'phone' => '(41) 95555-4444', 'product_index' => 3],
            ['name' => 'Patrícia Gomes', 'email' => 'patricia@email.com', 'phone' => '(51) 94444-5555', 'product_index' => 4],
        ];

        foreach ($buyers as $buyer) {
            DivulgadorBuyer::query()->updateOrCreate(
                [
                    'account_code' => $accountCode,
                    'email' => $buyer['email'],
                ],
                [
                    'divulgador_product_id' => $productModels[$buyer['product_index']]->id,
                    'name' => $buyer['name'],
                    'phone' => $buyer['phone'],
                ]
            );
        }

        $campaigns = [
            [
                'titulo' => 'Clareamento Solidário 2026',
                'objetivo' => 'Arrecadar doações por meio da divulgação de kits de clareamento dental.',
                'meta_financeira' => 5000.00,
                'banner' => 'https://placehold.co/1200x675/0f172a/ffffff?text=Clareamento+Solid%C3%A1rio+2026',
                'data_inicio' => '2026-05-01',
                'data_fim' => '2026-05-31',
                'nome_campanha' => 'Clareamento Solidário 2026',
                'produto_nome' => 'Kit Clareador Dental Premium',
                'fornecedor_nome' => 'Dental Shop Brasil',
                'meta_total' => 100,
                'progresso_atual' => 35,
                'status' => 'ativa',
            ],
            [
                'titulo' => 'Sorriso Tech',
                'objetivo' => 'Promover produtos odontológicos tecnológicos com geração de doações.',
                'meta_financeira' => 8000.00,
                'banner' => 'https://placehold.co/1200x675/134e4a/ffffff?text=Sorriso+Tech',
                'data_inicio' => '2026-05-10',
                'data_fim' => '2026-06-30',
                'nome_campanha' => 'Sorriso Tech',
                'produto_nome' => 'Escova Elétrica SmartClean',
                'fornecedor_nome' => 'Oral Prime',
                'meta_total' => 200,
                'progresso_atual' => 120,
                'status' => 'ativa',
            ],
            [
                'titulo' => 'Higiene Total',
                'objetivo' => 'Campanha de conscientização e divulgação de produtos de higiene bucal.',
                'meta_financeira' => 3500.00,
                'banner' => 'https://placehold.co/1200x675/334155/ffffff?text=Higiene+Total',
                'data_inicio' => '2026-04-01',
                'data_fim' => '2026-04-30',
                'nome_campanha' => 'Higiene Total',
                'produto_nome' => 'Fio Dental Expansível',
                'fornecedor_nome' => 'Sorriso Distribuidora',
                'meta_total' => 80,
                'progresso_atual' => 12,
                'status' => 'inativa',
            ],
        ];

        $campaignModels = [];

        foreach ($campaigns as $campaign) {
            $campaignModels[] = DivulgadorCampaign::query()->updateOrCreate(
                [
                    'account_code' => $accountCode,
                    'titulo' => $campaign['titulo'],
                ],
                [
                    'divulgador_id' => $divulgadorId,
                    'titulo' => $campaign['titulo'],
                    'objetivo' => $campaign['objetivo'],
                    'meta_financeira' => $campaign['meta_financeira'],
                    'banner' => $campaign['banner'],
                    'data_inicio' => $campaign['data_inicio'],
                    'data_fim' => $campaign['data_fim'],
                    'nome_campanha' => $campaign['nome_campanha'],
                    'produto_nome' => $campaign['produto_nome'],
                    'fornecedor_nome' => $campaign['fornecedor_nome'],
                    'meta_total' => $campaign['meta_total'],
                    'progresso_atual' => $campaign['progresso_atual'],
                    'status' => $campaign['status'],
                    'link_divulgacao' => null,
                ]
            );
        }

        $links = [
            ['campaign_index' => 0, 'code' => 'ABC123CLAREAR', 'commission_value' => 980.00],
            ['campaign_index' => 1, 'code' => 'XYZ789SORRISO', 'commission_value' => 870.00],
        ];

        foreach ($links as $link) {
            $campaign = $campaignModels[$link['campaign_index']];
            $publicUrl = 'https://app.com/r/' . strtolower($link['code']);

            DivulgadorLink::query()->updateOrCreate(
                [
                    'account_code' => $accountCode,
                    'code' => $link['code'],
                ],
                [
                    'divulgador_id' => $divulgadorId,
                    'campaign_id' => $campaign->id,
                    'divulgador_product_id' => null,
                    'url' => $publicUrl,
                    'status' => 'Ativo',
                    'commission_value' => $link['commission_value'],
                ]
            );

            $campaign->update([
                'link_divulgacao' => $publicUrl,
            ]);
        }

        $donations = [
            ['donor_name' => 'Mariana Lopes', 'purchase_value' => 250.00, 'donation_value' => 25.00, 'donation_date' => '2026-05-10', 'status' => 'Recebido'],
            ['donor_name' => 'Carlos Mendes', 'purchase_value' => 180.00, 'donation_value' => 18.00, 'donation_date' => '2026-05-12', 'status' => 'Pendente'],
            ['donor_name' => 'Fernanda Rocha', 'purchase_value' => 320.00, 'donation_value' => 32.00, 'donation_date' => '2026-05-14', 'status' => 'Recebido'],
            ['donor_name' => 'João Almeida', 'purchase_value' => 95.00, 'donation_value' => 9.50, 'donation_date' => '2026-05-15', 'status' => 'Pendente'],
        ];

        foreach ($donations as $donation) {
            DivulgadorDonation::query()->updateOrCreate(
                [
                    'account_code' => $accountCode,
                    'donor_name' => $donation['donor_name'],
                    'donation_date' => $donation['donation_date'],
                ],
                [
                    'purchase_value' => $donation['purchase_value'],
                    'donation_value' => $donation['donation_value'],
                    'status' => $donation['status'],
                ]
            );
        }
    }
}
