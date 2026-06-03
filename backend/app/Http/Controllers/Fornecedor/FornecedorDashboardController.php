<?php

namespace App\Http\Controllers\Fornecedor;

use App\Http\Controllers\Api\V1\Controller;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\View\View;

class FornecedorDashboardController extends Controller
{
    public function dashboard(Request $request): View
    {
        /** @var User $user */
        $user = $request->user('web') ?? auth('web')->user();

        $productQuery = Product::withoutGlobalScopes()
            ->where('account_id', $user->id)
            ->latest('id')
            ->with('images');

        $products = $productQuery->get();
        $hasRealProducts = $products->isNotEmpty();
        $demoProducts = $this->demoProducts();
        $productRows = $this->buildProductRows($hasRealProducts ? $products : collect($demoProducts));
        $recentProducts = array_slice($productRows, 0, 3);
        $productNames = collect($productRows)->pluck('product')->filter()->values()->all();

        $featuredCampaigns = $this->buildCampaigns($productNames);
        $recentSales = $this->buildSales($productNames);
        $stockSummary = $this->buildStockSummary($hasRealProducts ? $products : collect($demoProducts));
        $metrics = [
            'products_count' => $hasRealProducts ? $products->count() : 42,
            'stock_total' => $stockSummary['total'] ?: 1280,
            'campaigns_active' => 6,
            'sales_count' => 318,
            'total_sold' => 48750.00,
            'amount_receivable' => 12430.00,
        ];

        $summaryCards = $this->buildSummaryCards(
            $user,
            $metrics
        );

        return view('fornecedor.dashboard', [
            'user' => $user,
            'roleLabel' => $user->accountHasRole('fornecedor_admin') ? 'Admin' : 'Colaborador',
            'isAdmin' => $user->accountHasRole('fornecedor_admin'),
            'summaryCards' => $summaryCards,
            'featuredCampaigns' => $featuredCampaigns,
            'stockSummary' => $stockSummary,
            'recentProducts' => $recentProducts,
            'recentSales' => $recentSales,
            'financial' => $this->buildFinancialSummary($metrics),
            'menuItems' => $this->buildMenuItems($user),
            'metrics' => $metrics,
            'heroStats' => [
                'products' => $metrics['products_count'],
                'campaigns' => $metrics['campaigns_active'],
                'sales' => $metrics['sales_count'],
                'stock' => $metrics['stock_total'],
            ],
        ]);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function buildSummaryCards(User $user, array $metrics): array
    {
        $cards = [
            [
                'label' => 'Produtos cadastrados',
                'value' => number_format($metrics['products_count'], 0, ',', '.'),
                'hint' => 'Produtos vinculados ao fornecedor logado',
                'icon' => '🛒',
                'tone' => 'blue',
            ],
            [
                'label' => 'Estoque total reservado',
                'value' => number_format($metrics['stock_total'], 0, ',', '.'),
                'hint' => 'Unidades distribuídas entre todos os produtos',
                'icon' => '📦',
                'tone' => 'slate',
            ],
            [
                'label' => 'Campanhas ativas',
                'value' => number_format($metrics['campaigns_active'], 0, ',', '.'),
                'hint' => 'Campanhas vinculadas aos seus produtos',
                'icon' => '🎯',
                'tone' => 'green',
            ],
            [
                'label' => 'Vendas realizadas',
                'value' => number_format($metrics['sales_count'], 0, ',', '.'),
                'hint' => 'Movimentações recentes do fornecedor',
                'icon' => '📈',
                'tone' => 'amber',
            ],
        ];

        if ($user->accountHasRole('fornecedor_admin')) {
            $cards[] = [
                'label' => 'Valor total vendido',
                'value' => $this->money($metrics['total_sold']),
                'hint' => 'Volume comercial consolidado',
                'icon' => '💰',
                'tone' => 'emerald',
            ];

            $cards[] = [
                'label' => 'Valor a receber',
                'value' => $this->money($metrics['amount_receivable']),
                'hint' => 'Saldo pendente para repasse',
                'icon' => '🧾',
                'tone' => 'violet',
            ];
        }

        return $cards;
    }

    /**
     * @param iterable<int, Product|array<string, mixed>> $products
     * @return array<int, array<string, mixed>>
     */
    private function buildProductRows(iterable $products): array
    {
        $rows = [];

        foreach ($products as $index => $product) {
            $codigo = is_array($product) ? (string) ($product['codigo'] ?? '') : (string) ($product->codigo ?? '');
            $name = is_array($product) ? (string) ($product['name'] ?? '') : (string) ($product->name ?? '');
            $value = is_array($product) ? (float) ($product['valor_venda'] ?? 0) : (float) ($product->valor_venda ?? 0);
            $stock = is_array($product) ? (int) ($product['estoque_reservado'] ?? 0) : (int) ($product->estoque_reservado ?? 0);
            $status = $stock <= 0 ? 'Sem estoque' : 'Ativo';

            $rows[] = [
                'index' => $index + 1,
                'codigo' => $codigo !== '' ? $codigo : 'PROD-' . str_pad((string) ($index + 1), 3, '0', STR_PAD_LEFT),
                'product' => $name !== '' ? $name : 'Produto sem nome',
                'value' => $value > 0 ? $this->money($value) : 'R$ 0,00',
                'stock' => $stock,
                'status' => $status,
                'status_class' => $stock <= 0 ? 'danger' : 'success',
            ];
        }

        if (empty($rows)) {
            foreach ($this->demoProducts() as $index => $product) {
                $rows[] = [
                    'index' => $index + 1,
                    'codigo' => $product['codigo'],
                    'product' => $product['product'],
                    'value' => $this->money($product['value']),
                    'stock' => $product['stock'],
                    'status' => $product['stock'] <= 0 ? 'Sem estoque' : 'Ativo',
                    'status_class' => $product['stock'] <= 0 ? 'danger' : 'success',
                ];
            }
        }

        return $rows;
    }

    /**
     * @param iterable<int, Product|array<string, mixed>> $products
     * @return array<string, int>
     */
    private function buildStockSummary(iterable $products): array
    {
        $products = collect($products);
        $stockValues = $products->map(function ($product): int {
            if (is_array($product)) {
                return (int) ($product['stock'] ?? $product['estoque_reservado'] ?? 0);
            }

            return (int) ($product->estoque_reservado ?? 0);
        });

        if ($stockValues->isEmpty()) {
            return [
                'high' => 28,
                'low' => 10,
                'zero' => 4,
                'total' => 1280,
            ];
        }

        return [
            'high' => $stockValues->filter(fn (int $value) => $value >= 20)->count(),
            'low' => $stockValues->filter(fn (int $value) => $value > 0 && $value < 20)->count(),
            'zero' => $stockValues->filter(fn (int $value) => $value <= 0)->count(),
            'total' => (int) $stockValues->sum(),
        ];
    }

    /**
     * @param array<int, string> $productNames
     * @return array<int, array<string, mixed>>
     */
    private function buildCampaigns(array $productNames): array
    {
        $defaults = [
            [
                'name' => 'Clareamento Solidário 2026',
                'product' => $productNames[0] ?? 'Kit Clareador Dental Premium',
                'period' => '01/05/2026 a 31/05/2026',
                'goal' => 5000.00,
                'progress' => 3250.00,
                'status' => 'Ativa',
                'tone' => 'blue',
            ],
            [
                'name' => 'Sorriso Tech',
                'product' => $productNames[1] ?? 'Escova Elétrica SmartClean',
                'period' => '10/05/2026 a 30/06/2026',
                'goal' => 8000.00,
                'progress' => 4900.00,
                'status' => 'Ativa',
                'tone' => 'green',
            ],
        ];

        return array_map(function (array $campaign): array {
            $progressPercent = (int) min(100, round(($campaign['progress'] / max(1, $campaign['goal'])) * 100));

            return [
                'name' => $campaign['name'],
                'product' => $campaign['product'],
                'period' => $campaign['period'],
                'goal' => $this->money($campaign['goal']),
                'progress' => $this->money($campaign['progress']),
                'status' => $campaign['status'],
                'progress_percent' => $progressPercent,
                'tone' => $campaign['tone'],
            ];
        }, $defaults);
    }

    /**
     * @param array<int, string> $productNames
     * @return array<int, array<string, mixed>>
     */
    private function buildSales(array $productNames): array
    {
        return [
            [
                'buyer' => 'Mariana Lopes',
                'product' => $productNames[0] ?? 'Kit Clareador Dental Premium',
                'divulgador' => 'Divulgador Alpha',
                'value' => 'R$ 249,90',
                'date' => '10/05/2026',
                'status' => 'Recebido',
            ],
            [
                'buyer' => 'Carlos Mendes',
                'product' => $productNames[1] ?? 'Escova Elétrica SmartClean',
                'divulgador' => 'Divulgador Beta',
                'value' => 'R$ 189,90',
                'date' => '12/05/2026',
                'status' => 'Pendente',
            ],
            [
                'buyer' => 'Fernanda Rocha',
                'product' => $productNames[2] ?? 'Irrigador Oral Portátil',
                'divulgador' => 'Divulgador Alpha',
                'value' => 'R$ 320,00',
                'date' => '14/05/2026',
                'status' => 'Recebido',
            ],
        ];
    }

    /**
     * @return array<string, float>
     */
    private function buildFinancialSummary(array $metrics): array
    {
        return [
            'total_sold' => $metrics['total_sold'],
            'received' => 36420.00,
            'pending' => $metrics['amount_receivable'],
            'ticket_avg' => 153.29,
            'formatted' => [
                'total_sold' => $this->money($metrics['total_sold']),
                'received' => $this->money(36420.00),
                'pending' => $this->money($metrics['amount_receivable']),
                'ticket_avg' => $this->money(153.29),
            ],
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function buildMenuItems(User $user): array
    {
        $items = [
            ['label' => 'Dashboard', 'href' => route('fornecedor.dashboard'), 'active' => true],
            ['label' => 'Produtos', 'href' => route('fornecedor.produtos.index'), 'active' => false],
            ['label' => 'Novo Produto', 'href' => route('fornecedor.produtos.create'), 'active' => false],
            ['label' => 'Importar Produtos', 'href' => route('fornecedor.produtos.importar'), 'active' => false],
            ['label' => 'Campanhas', 'href' => '#campanhas', 'active' => false],
            ['label' => 'Estoque', 'href' => '#estoque', 'active' => false],
            ['label' => 'Vendas', 'href' => '#vendas', 'active' => false],
        ];

        if ($user->accountHasRole('fornecedor_admin')) {
            $items[] = ['label' => 'Financeiro', 'href' => '#financeiro', 'active' => false];
        }

        $items[] = ['label' => 'Sair', 'href' => route('fornecedor.logout'), 'active' => false, 'method' => 'post'];

        return $items;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function demoProducts(): array
    {
        return [
            ['codigo' => 'PROD-001', 'product' => 'Kit Clareador Dental Premium', 'value' => 249.90, 'stock' => 15],
            ['codigo' => 'PROD-002', 'product' => 'Escova Elétrica SmartClean', 'value' => 189.90, 'stock' => 8],
            ['codigo' => 'PROD-003', 'product' => 'Irrigador Oral Portátil', 'value' => 320.00, 'stock' => 0],
        ];
    }

    private function money(float $value): string
    {
        return 'R$ ' . number_format($value, 2, ',', '.');
    }
}
