<?php

namespace Database\Seeders;

use App\Models\DivulgadorBuyer;
use App\Models\DivulgadorCampaign;
use App\Models\DivulgadorDonation;
use App\Models\DivulgadorLink;
use App\Models\DivulgadorProduct;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

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

        $this->seedChurchDivulgadores();
    }

    private function seedChurchDivulgadores(): void
    {
        foreach ($this->churchDivulgadores() as $church) {
            $user = $this->ensureChurchUser($church);

            $products = $this->ensureChurchProducts($church);
            $campaigns = $this->ensureChurchCampaigns($church, $user, $products);

            $this->ensureChurchLinks($church, $user, $campaigns, $products);
        }
    }

    private function churchDivulgadores(): array
    {
        return [
            [
                'name' => 'Igreja Batista Esperanca Viva',
                'account_code' => 'igreja-batista-esperanca-viva',
                'email' => 'admin.igreja.esperanca@teste.com',
                'first_name' => 'Ana',
                'last_name' => 'Esperanca',
                'birth_day' => '1987-03-14',
                'cpf' => '111.222.333-44',
                'cnpj' => '12.345.678/0001-90',
                'phone' => '(11) 97770-1001',
                'role_name' => 'divulgador_admin',
                'address' => [
                    'cep' => '01010-010',
                    'street_type' => 'Rua',
                    'street_name' => 'da Esperanca',
                    'street_number' => '120',
                    'street_complement' => 'Sala 4',
                    'street_neighborhood' => 'Centro',
                    'street_city' => 'Sao Paulo',
                    'street_state' => 'SP',
                ],
                'products' => [
                    ['name' => 'Biblia de Estudo Esperanca Viva', 'supplier_name' => 'Editora Palavra Viva', 'price' => 79.90, 'stock' => 80],
                    ['name' => 'Camiseta da Juventude', 'supplier_name' => 'Gratica da Fe', 'price' => 49.90, 'stock' => 120],
                    ['name' => 'Agenda Devocional 2026', 'supplier_name' => 'Grafica da Fe', 'price' => 39.90, 'stock' => 90],
                    ['name' => 'Kit Culto no Lar', 'supplier_name' => 'Semeadores do Reino', 'price' => 64.90, 'stock' => 70],
                    ['name' => 'Livro de Oracoes da Manha', 'supplier_name' => 'Editora Luz e Vida', 'price' => 29.90, 'stock' => 140],
                ],
                'campaigns' => [
                    ['titulo' => 'Cesta Solidaria Esperanca Viva', 'objetivo' => 'Arrecadar recursos para cestas basicas da comunidade.', 'meta_financeira' => 6200.00, 'banner' => 'https://placehold.co/1200x675/0f172a/ffffff?text=Cesta+Solidaria+Esperanca+Viva', 'offset' => 1, 'produto_nome' => 'Biblia de Estudo Esperanca Viva', 'fornecedor_nome' => 'Editora Palavra Viva', 'meta_total' => 120, 'progresso_atual' => 54],
                    ['titulo' => 'Reforma do Espaco Infantil', 'objetivo' => 'Apoiar a renovacao do espaco infantil e salas de apoio.', 'meta_financeira' => 14500.00, 'banner' => 'https://placehold.co/1200x675/123a7a/ffffff?text=Reforma+Espaco+Infantil', 'offset' => 4, 'produto_nome' => 'Camiseta da Juventude', 'fornecedor_nome' => 'Gratica da Fe', 'meta_total' => 200, 'progresso_atual' => 88],
                    ['titulo' => 'Confraternizacao das Familias', 'objetivo' => 'Contribuir para o encontro anual das familias da igreja.', 'meta_financeira' => 3900.00, 'banner' => 'https://placehold.co/1200x675/1d4ed8/ffffff?text=Confraternizacao+das+Familias', 'offset' => 7, 'produto_nome' => 'Agenda Devocional 2026', 'fornecedor_nome' => 'Grafica da Fe', 'meta_total' => 90, 'progresso_atual' => 43],
                    ['titulo' => 'Escola Biblica de Ferias', 'objetivo' => 'Financiar materiais e atividades para as criancas.', 'meta_financeira' => 5100.00, 'banner' => 'https://placehold.co/1200x675/0f3d8c/ffffff?text=Escola+Biblica+de+Ferias', 'offset' => 10, 'produto_nome' => 'Kit Culto no Lar', 'fornecedor_nome' => 'Semeadores do Reino', 'meta_total' => 150, 'progresso_atual' => 66],
                    ['titulo' => 'Missao e Evangelismo', 'objetivo' => 'Sustentar a frente missionaria e a distribuicao de materiais.', 'meta_financeira' => 7800.00, 'banner' => 'https://placehold.co/1200x675/1e3a8a/ffffff?text=Missao+e+Evangelismo', 'offset' => 13, 'produto_nome' => 'Livro de Oracoes da Manha', 'fornecedor_nome' => 'Editora Luz e Vida', 'meta_total' => 110, 'progresso_atual' => 37],
                ],
            ],
            [
                'name' => 'Assembleia de Deus Fonte de Vida',
                'account_code' => 'assembleia-de-deus-fonte-de-vida',
                'email' => 'admin.assembleia.fonte@teste.com',
                'first_name' => 'Bruno',
                'last_name' => 'Fonte',
                'birth_day' => '1984-08-22',
                'cpf' => '222.333.444-55',
                'cnpj' => '23.456.789/0001-01',
                'phone' => '(21) 96660-2002',
                'role_name' => 'divulgador_admin',
                'address' => [
                    'cep' => '20010-020',
                    'street_type' => 'Av.',
                    'street_name' => 'Fonte de Vida',
                    'street_number' => '455',
                    'street_complement' => 'Bloco A',
                    'street_neighborhood' => 'Gloria',
                    'street_city' => 'Rio de Janeiro',
                    'street_state' => 'RJ',
                ],
                'products' => [
                    ['name' => 'Caderno de Estudos Biblicos', 'supplier_name' => 'Editora Fonte de Vida', 'price' => 34.90, 'stock' => 150],
                    ['name' => 'Caneca da Igreja', 'supplier_name' => 'Oficina Adao', 'price' => 24.90, 'stock' => 200],
                    ['name' => 'Mochila da Escola Biblica', 'supplier_name' => 'Grafica da Esperanca', 'price' => 89.90, 'stock' => 60],
                    ['name' => 'Pulseira Juventude Viva', 'supplier_name' => 'Acessorios do Reino', 'price' => 14.90, 'stock' => 300],
                    ['name' => 'Devocional 365 Dias', 'supplier_name' => 'Editora Caminho', 'price' => 59.90, 'stock' => 95],
                ],
                'campaigns' => [
                    ['titulo' => 'Mutirao de Cestas', 'objetivo' => 'Apoiar familias em vulnerabilidade com alimentos e itens basicos.', 'meta_financeira' => 5800.00, 'banner' => 'https://placehold.co/1200x675/14532d/ffffff?text=Mutirao+de+Cestas', 'offset' => 2, 'produto_nome' => 'Caderno de Estudos Biblicos', 'fornecedor_nome' => 'Editora Fonte de Vida', 'meta_total' => 130, 'progresso_atual' => 79],
                    ['titulo' => 'Nova Geração em Missão', 'objetivo' => 'Conectar jovens ao trabalho missionario local.', 'meta_financeira' => 7600.00, 'banner' => 'https://placehold.co/1200x675/0f172a/ffffff?text=Nova+Geracao+em+Missao', 'offset' => 5, 'produto_nome' => 'Caneca da Igreja', 'fornecedor_nome' => 'Oficina Adao', 'meta_total' => 160, 'progresso_atual' => 101],
                    ['titulo' => 'Construindo a Casa de Culto', 'objetivo' => 'Levantar fundos para melhorias estruturais do templo.', 'meta_financeira' => 18000.00, 'banner' => 'https://placehold.co/1200x675/1e40af/ffffff?text=Construindo+a+Casa+de+Culto', 'offset' => 8, 'produto_nome' => 'Mochila da Escola Biblica', 'fornecedor_nome' => 'Grafica da Esperanca', 'meta_total' => 250, 'progresso_atual' => 116],
                    ['titulo' => 'Acao Solidaria de Inverno', 'objetivo' => 'Distribuir roupas e cobertores para a cidade.', 'meta_financeira' => 4200.00, 'banner' => 'https://placehold.co/1200x675/312e81/ffffff?text=Acao+Solidaria+de+Inverno', 'offset' => 11, 'produto_nome' => 'Pulseira Juventude Viva', 'fornecedor_nome' => 'Acessorios do Reino', 'meta_total' => 100, 'progresso_atual' => 52],
                    ['titulo' => 'Retiro de Lideranca', 'objetivo' => 'Custear o encontro anual de pastores e lideres.', 'meta_financeira' => 9300.00, 'banner' => 'https://placehold.co/1200x675/0f3d8c/ffffff?text=Retiro+de+Lideranca', 'offset' => 14, 'produto_nome' => 'Devocional 365 Dias', 'fornecedor_nome' => 'Editora Caminho', 'meta_total' => 140, 'progresso_atual' => 61],
                ],
            ],
            [
                'name' => 'Ministerio Nova Alianca',
                'account_code' => 'ministerio-nova-alianca',
                'email' => 'admin.ministerio.nova@teste.com',
                'first_name' => 'Carla',
                'last_name' => 'Alianca',
                'birth_day' => '1990-11-03',
                'cpf' => '333.444.555-66',
                'cnpj' => '34.567.890/0001-12',
                'phone' => '(31) 95550-3003',
                'role_name' => 'divulgador_admin',
                'address' => [
                    'cep' => '30110-030',
                    'street_type' => 'Rua',
                    'street_name' => 'Nova Alianca',
                    'street_number' => '88',
                    'street_complement' => 'Andar 2',
                    'street_neighborhood' => 'Funcionarios',
                    'street_city' => 'Belo Horizonte',
                    'street_state' => 'MG',
                ],
                'products' => [
                    ['name' => 'Kit de Louvor', 'supplier_name' => 'Sons da Fe', 'price' => 129.90, 'stock' => 35],
                    ['name' => 'Bandeira Ministerial', 'supplier_name' => 'Grafica Avivar', 'price' => 74.90, 'stock' => 55],
                    ['name' => 'Livro de Lideranca Crista', 'supplier_name' => 'Editora Viva', 'price' => 54.90, 'stock' => 110],
                    ['name' => 'Caderno de Anotacoes', 'supplier_name' => 'Papel & Oracao', 'price' => 18.90, 'stock' => 220],
                    ['name' => 'Pulseira da Fe', 'supplier_name' => 'Acessorios do Altissimo', 'price' => 12.90, 'stock' => 500],
                ],
                'campaigns' => [
                    ['titulo' => 'Campanha Alianca de Paz', 'objetivo' => 'Reforcar o apoio a familias em situacao de vulnerabilidade.', 'meta_financeira' => 4500.00, 'banner' => 'https://placehold.co/1200x675/134e4a/ffffff?text=Campanha+Alianca+de+Paz', 'offset' => 3, 'produto_nome' => 'Kit de Louvor', 'fornecedor_nome' => 'Sons da Fe', 'meta_total' => 90, 'progresso_atual' => 47],
                    ['titulo' => 'Projeto Templo Vivo', 'objetivo' => 'Modernizar equipamentos e ambiente de culto.', 'meta_financeira' => 10200.00, 'banner' => 'https://placehold.co/1200x675/0f172a/ffffff?text=Projeto+Templo+Vivo', 'offset' => 6, 'produto_nome' => 'Bandeira Ministerial', 'fornecedor_nome' => 'Grafica Avivar', 'meta_total' => 180, 'progresso_atual' => 72],
                    ['titulo' => 'Mulheres de Proposito', 'objetivo' => 'Apoiar o encontro e a formacao do ministerio feminino.', 'meta_financeira' => 3600.00, 'banner' => 'https://placehold.co/1200x675/1d4ed8/ffffff?text=Mulheres+de+Proposito', 'offset' => 9, 'produto_nome' => 'Livro de Lideranca Crista', 'fornecedor_nome' => 'Editora Viva', 'meta_total' => 95, 'progresso_atual' => 36],
                    ['titulo' => 'Escola de Disciplulado', 'objetivo' => 'Estruturar material didatico para novos membros.', 'meta_financeira' => 5100.00, 'banner' => 'https://placehold.co/1200x675/1e3a8a/ffffff?text=Escola+de+Discipulado', 'offset' => 12, 'produto_nome' => 'Caderno de Anotacoes', 'fornecedor_nome' => 'Papel & Oracao', 'meta_total' => 150, 'progresso_atual' => 95],
                    ['titulo' => 'Jornada Missionaria', 'objetivo' => 'Financiar deslocamentos e materiais missionarios.', 'meta_financeira' => 8400.00, 'banner' => 'https://placehold.co/1200x675/0f3d8c/ffffff?text=Jornada+Missionaria', 'offset' => 15, 'produto_nome' => 'Pulseira da Fe', 'fornecedor_nome' => 'Acessorios do Altissimo', 'meta_total' => 130, 'progresso_atual' => 81],
                ],
            ],
            [
                'name' => 'Igreja Evangelica Casa de Paz',
                'account_code' => 'igreja-evangelica-casa-de-paz',
                'email' => 'admin.casa.paz@teste.com',
                'first_name' => 'Diego',
                'last_name' => 'Paz',
                'birth_day' => '1989-05-19',
                'cpf' => '444.555.666-77',
                'cnpj' => '45.678.901/0001-23',
                'phone' => '(41) 94440-4004',
                'role_name' => 'divulgador_admin',
                'address' => [
                    'cep' => '80010-040',
                    'street_type' => 'Rua',
                    'street_name' => 'Casa de Paz',
                    'street_number' => '260',
                    'street_complement' => null,
                    'street_neighborhood' => 'Centro',
                    'street_city' => 'Curitiba',
                    'street_state' => 'PR',
                ],
                'products' => [
                    ['name' => 'Copo Termico da Paz', 'supplier_name' => 'Brindes da Fe', 'price' => 44.90, 'stock' => 240],
                    ['name' => 'Livro de Estudos Familiares', 'supplier_name' => 'Editora Harmonia', 'price' => 69.90, 'stock' => 75],
                    ['name' => 'Banner de Evento', 'supplier_name' => 'Grafica Paz e Vida', 'price' => 99.90, 'stock' => 45],
                    ['name' => 'Camiseta da Paz', 'supplier_name' => 'Atelie Reino', 'price' => 39.90, 'stock' => 180],
                    ['name' => 'Planner Cristao', 'supplier_name' => 'Papel & Propósito', 'price' => 49.90, 'stock' => 100],
                ],
                'campaigns' => [
                    ['titulo' => 'Paz para as Familias', 'objetivo' => 'Levantar recursos para encontros e assistencia social.', 'meta_financeira' => 4700.00, 'banner' => 'https://placehold.co/1200x675/334155/ffffff?text=Paz+para+as+Familias', 'offset' => 2, 'produto_nome' => 'Copo Termico da Paz', 'fornecedor_nome' => 'Brindes da Fe', 'meta_total' => 100, 'progresso_atual' => 63],
                    ['titulo' => 'Juventude em Movimento', 'objetivo' => 'Estimular a participacao dos jovens em projetos sociais.', 'meta_financeira' => 6900.00, 'banner' => 'https://placehold.co/1200x675/0f172a/ffffff?text=Juventude+em+Movimento', 'offset' => 5, 'produto_nome' => 'Livro de Estudos Familiares', 'fornecedor_nome' => 'Editora Harmonia', 'meta_total' => 120, 'progresso_atual' => 84],
                    ['titulo' => 'Noite de Adoracao', 'objetivo' => 'Produzir o evento anual com estrutura e transmissao.', 'meta_financeira' => 8100.00, 'banner' => 'https://placehold.co/1200x675/1d4ed8/ffffff?text=Noite+de+Adoracao', 'offset' => 8, 'produto_nome' => 'Banner de Evento', 'fornecedor_nome' => 'Grafica Paz e Vida', 'meta_total' => 150, 'progresso_atual' => 99],
                    ['titulo' => 'Mulheres em Missao', 'objetivo' => 'Sustentar o projeto de visitas e acolhimento.', 'meta_financeira' => 3300.00, 'banner' => 'https://placehold.co/1200x675/0f3d8c/ffffff?text=Mulheres+em+Missao', 'offset' => 11, 'produto_nome' => 'Camiseta da Paz', 'fornecedor_nome' => 'Atelie Reino', 'meta_total' => 80, 'progresso_atual' => 29],
                    ['titulo' => 'Crescendo em Fe', 'objetivo' => 'Formar novos discipulos com material personalizado.', 'meta_financeira' => 5400.00, 'banner' => 'https://placehold.co/1200x675/14532d/ffffff?text=Crescendo+em+Fe', 'offset' => 14, 'produto_nome' => 'Planner Cristao', 'fornecedor_nome' => 'Papel & Propósito', 'meta_total' => 110, 'progresso_atual' => 55],
                ],
            ],
            [
                'name' => 'Catedral da Fe e Servico',
                'account_code' => 'catedral-da-fe-e-servico',
                'email' => 'admin.catedral.fe@teste.com',
                'first_name' => 'Elisa',
                'last_name' => 'Servico',
                'birth_day' => '1993-02-28',
                'cpf' => '555.666.777-88',
                'cnpj' => '56.789.012/0001-34',
                'phone' => '(51) 93330-5005',
                'role_name' => 'divulgador_admin',
                'address' => [
                    'cep' => '90010-050',
                    'street_type' => 'Av.',
                    'street_name' => 'Fe e Servico',
                    'street_number' => '1020',
                    'street_complement' => 'Torre B',
                    'street_neighborhood' => 'Cidade Baixa',
                    'street_city' => 'Porto Alegre',
                    'street_state' => 'RS',
                ],
                'products' => [
                    ['name' => 'Kit de Evangelismo', 'supplier_name' => 'Missao Viva', 'price' => 59.90, 'stock' => 140],
                    ['name' => 'Banner Institucional', 'supplier_name' => 'Grafica Luz', 'price' => 109.90, 'stock' => 25],
                    ['name' => 'Livro de Sermoes', 'supplier_name' => 'Editora Servir', 'price' => 84.90, 'stock' => 60],
                    ['name' => 'Caneta e Marca Pagina', 'supplier_name' => 'Papel Santa', 'price' => 19.90, 'stock' => 260],
                    ['name' => 'Camiseta Missionaria', 'supplier_name' => 'Atelie da Fe', 'price' => 44.90, 'stock' => 175],
                ],
                'campaigns' => [
                    ['titulo' => 'Servico ao Proximo', 'objetivo' => 'Sustentar a assistencia social e as visitas comunitarias.', 'meta_financeira' => 5600.00, 'banner' => 'https://placehold.co/1200x675/0f172a/ffffff?text=Servico+ao+Proximo', 'offset' => 1, 'produto_nome' => 'Kit de Evangelismo', 'fornecedor_nome' => 'Missao Viva', 'meta_total' => 100, 'progresso_atual' => 41],
                    ['titulo' => 'Reforma do Auditório', 'objetivo' => 'Melhorar infraestrutura para cultos e eventos.', 'meta_financeira' => 16500.00, 'banner' => 'https://placehold.co/1200x675/1d4ed8/ffffff?text=Reforma+do+Auditorio', 'offset' => 4, 'produto_nome' => 'Banner Institucional', 'fornecedor_nome' => 'Grafica Luz', 'meta_total' => 220, 'progresso_atual' => 135],
                    ['titulo' => 'Projeto Missionario Sul', 'objetivo' => 'Enviar recursos para frentes missionarias regionais.', 'meta_financeira' => 9200.00, 'banner' => 'https://placehold.co/1200x675/0f3d8c/ffffff?text=Projeto+Missionario+Sul', 'offset' => 7, 'produto_nome' => 'Livro de Sermoes', 'fornecedor_nome' => 'Editora Servir', 'meta_total' => 145, 'progresso_atual' => 62],
                    ['titulo' => 'Adolescentes com Proposito', 'objetivo' => 'Promover formacao e eventos para adolescentes.', 'meta_financeira' => 4100.00, 'banner' => 'https://placehold.co/1200x675/334155/ffffff?text=Adolescentes+com+Proposito', 'offset' => 10, 'produto_nome' => 'Caneta e Marca Pagina', 'fornecedor_nome' => 'Papel Santa', 'meta_total' => 90, 'progresso_atual' => 33],
                    ['titulo' => 'Conferencia da Fe', 'objetivo' => 'Viabilizar a conferencia anual de lideranca e adoracao.', 'meta_financeira' => 11400.00, 'banner' => 'https://placehold.co/1200x675/14532d/ffffff?text=Conferencia+da+Fe', 'offset' => 13, 'produto_nome' => 'Camiseta Missionaria', 'fornecedor_nome' => 'Atelie da Fe', 'meta_total' => 180, 'progresso_atual' => 97],
                ],
            ],
        ];
    }

    private function ensureChurchUser(array $church): User
    {
        $user = User::query()->updateOrCreate(
            ['email' => $church['email']],
            [
                'activity_scope' => 'divulgador_level',
                'account_type' => 'divulgador',
                'created_at' => now(),
                'birth_day' => $church['birth_day'],
                'cpf' => $church['cpf'],
                'cnpj' => $church['cnpj'],
                'cep' => $church['address']['cep'],
                'street_type' => $church['address']['street_type'],
                'street_name' => $church['address']['street_name'],
                'street_number' => $church['address']['street_number'],
                'street_complement' => $church['address']['street_complement'],
                'street_neighborhood' => $church['address']['street_neighborhood'],
                'street_city' => $church['address']['street_city'],
                'street_state' => $church['address']['street_state'],
                'address' => $this->buildFullAddress($church['address']),
                'divulgador_account_code' => $church['account_code'],
                'email_verified_at' => now(),
                'first_name' => $church['first_name'],
                'last_name' => $church['last_name'],
                'password' => Hash::make('password'),
                'remember_token' => null,
                'slug' => Str::slug($church['account_code'] . '-admin'),
                'status' => 1,
                'divulgador_status' => 'approved',
                'store_owner' => 0,
                'stores' => null,
                'updated_at' => now(),
            ]
        );

        $role = Role::query()
            ->where('name', $church['role_name'])
            ->where('guard_name', 'api')
            ->first();

        if ($role) {
            $user->syncRoles([$role->name]);
        }

        return $user;
    }

    private function ensureChurchProducts(array $church): array
    {
        $products = [];

        foreach ($church['products'] as $index => $productData) {
            $products[] = DivulgadorProduct::query()->updateOrCreate(
                [
                    'account_code' => $church['account_code'],
                    'name' => $productData['name'],
                ],
                [
                    'supplier_name' => $productData['supplier_name'],
                    'price' => $productData['price'],
                    'stock' => $productData['stock'],
                    'status' => 'Ativo',
                ]
            );
        }

        return $products;
    }

    private function ensureChurchCampaigns(array $church, User $user, array $products): array
    {
        $campaignModels = [];

        foreach ($church['campaigns'] as $index => $campaign) {
            $start = now()->copy()->subDays($campaign['offset']);
            $end = now()->copy()->addDays($campaign['offset'] + 18);
            $product = $products[$index % count($products)];
            $urlCode = strtoupper(Str::slug($church['account_code'] . '-' . ($index + 1) . '-' . $campaign['titulo']));
            $publicUrl = 'https://app.com/r/' . strtolower($urlCode);

            $campaignModels[] = DivulgadorCampaign::query()->updateOrCreate(
                [
                    'account_code' => $church['account_code'],
                    'titulo' => $campaign['titulo'],
                ],
                [
                    'divulgador_id' => $user->id,
                    'titulo' => $campaign['titulo'],
                    'objetivo' => $campaign['objetivo'],
                    'meta_financeira' => $campaign['meta_financeira'],
                    'banner' => $campaign['banner'],
                    'data_inicio' => $start->format('Y-m-d'),
                    'data_fim' => $end->format('Y-m-d'),
                    'nome_campanha' => $campaign['titulo'],
                    'produto_nome' => $campaign['produto_nome'],
                    'fornecedor_nome' => $campaign['fornecedor_nome'],
                    'meta_total' => $campaign['meta_total'],
                    'progresso_atual' => $campaign['progresso_atual'],
                    'status' => 'ativa',
                    'link_divulgacao' => $publicUrl,
                ]
            );
        }

        return $campaignModels;
    }

    private function ensureChurchLinks(array $church, User $user, array $campaigns, array $products): void
    {
        foreach ($campaigns as $index => $campaign) {
            $product = $products[$index % count($products)];
            $code = strtoupper(Str::slug($church['account_code'] . '-link-' . ($index + 1)));

            DivulgadorLink::query()->updateOrCreate(
                [
                    'account_code' => $church['account_code'],
                    'code' => $code,
                ],
                [
                    'divulgador_id' => $user->id,
                    'campaign_id' => $campaign->id,
                    'divulgador_product_id' => $product->id,
                    'url' => 'https://app.com/r/' . strtolower($code),
                    'status' => 'Ativo',
                    'commission_value' => 500 + ($index * 75),
                ]
            );
        }
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
}
