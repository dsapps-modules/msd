<?php

namespace App\Http\Controllers\Divulgador;

use App\Http\Controllers\Api\V1\Controller;
use App\Models\DivulgadorBuyer;
use App\Models\DivulgadorCampaign;
use App\Models\DivulgadorDonation;
use App\Models\DivulgadorLink;
use App\Models\DivulgadorProduct;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\View\View;

class DivulgadorAuthController extends Controller
{
    public function create(): View|RedirectResponse
    {
        $user = Auth::guard('web')->user();

        if ($user && $user->isDivulgadorAccount() && $user->isDivulgadorApproved()) {
            return redirect()->route('divulgador.dashboard');
        }

        return view('divulgador.auth.login', [
            'dashboardUrl' => route('divulgador.dashboard'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8', 'max:32'],
            'remember' => ['nullable', 'boolean'],
        ]);

        $email = strtolower(trim((string) $credentials['email']));

        $user = User::query()
            ->whereRaw('LOWER(email) = ?', [$email])
            ->first();

        if (
            !$user ||
            !$user->isDivulgadorAccount() ||
            $user->activity_scope !== 'divulgador_level' ||
            !Hash::check($credentials['password'], $user->password)
        ) {
            return back()
                ->withErrors([
                    'email' => 'Credenciais inválidas para acesso do divulgador.',
                ])
                ->onlyInput('email');
        }

        if ($user->isDivulgadorPending()) {
            return redirect()
                ->route('divulgador.analisando')
                ->with([
                    'divulgador_name' => $user->full_name,
                    'divulgador_email' => $user->email,
                ]);
        }

        if ($user->isDivulgadorRejected()) {
            return back()
                ->withErrors([
                    'email' => 'Seu cadastro de divulgador foi rejeitado.',
                ])
                ->onlyInput('email');
        }

        if (!$user->isDivulgadorApproved()) {
            return back()
                ->withErrors([
                    'email' => 'Seu cadastro de divulgador ainda nao foi aprovado.',
                ])
                ->onlyInput('email');
        }

        Auth::guard('web')->login($user, (bool) ($credentials['remember'] ?? false));
        $request->session()->regenerate();

        return redirect()->intended(route('divulgador.dashboard'));
    }

    public function dashboard(Request $request): View|RedirectResponse
    {
        $user = Auth::guard('web')->user();

        if (!$user || !$user->isDivulgadorAccount() || !$user->isDivulgadorApproved()) {
            return redirect()->route('divulgador.login.form');
        }

        $accountCode = (string) ($user->divulgador_account_code ?: 'demo-divulgador');
        $campaignRows = $this->buildCampaignRows($user, $accountCode);
        $selectedCampaignId = $request->integer('edit_campaign');
        $selectedCampaign = $selectedCampaignId
            ? collect($campaignRows)->firstWhere('id', $selectedCampaignId)
            : null;
        $featuredCampaigns = $this->buildFeaturedCampaigns($user, $accountCode);
        $recentProducts = $this->buildRecentProducts($accountCode);
        $recentSales = $this->buildRecentSales($accountCode, $user, $recentProducts);
        $stockSummary = $this->buildStockSummary($accountCode);
        $metrics = $this->buildMetrics($accountCode, $featuredCampaigns, $recentProducts, $recentSales, $stockSummary);
        $summaryCards = $this->buildSummaryCards($user, $metrics);
        $financial = $this->buildFinancialSummary($accountCode, $recentSales);

        return view('divulgador.dashboard', [
            'user' => $user,
            'roleLabel' => $user->divulgadorHasRole('divulgador_admin') ? 'Admin' : 'Colaborador',
            'summaryCards' => $summaryCards,
            'campaignRows' => $campaignRows,
            'campaignForm' => $this->buildCampaignFormData($selectedCampaign),
            'featuredCampaigns' => $featuredCampaigns,
            'recentProducts' => $recentProducts,
            'recentSales' => $recentSales,
            'stockSummary' => $stockSummary,
            'metrics' => $metrics,
            'heroStats' => [
                'campaigns' => $metrics['campaigns_active'],
                'products' => $metrics['products_count'],
                'sales' => $metrics['sales_count'],
                'stock' => $metrics['stock_total'],
            ],
            'financial' => $financial,
            'isAdmin' => $user->divulgadorHasRole('divulgador_admin'),
            'menuItems' => $this->buildMenuItems($user),
            'logoutUrl' => route('divulgador.logout'),
        ]);
    }

    public function storeCampaign(Request $request): RedirectResponse
    {
        $user = $request->user('web');

        if (!$user || !$user->isDivulgadorAccount() || !$user->isDivulgadorApproved()) {
            return redirect()->route('divulgador.login.form');
        }

        $data = $request->validate([
            'titulo' => ['required', 'string', 'max:255'],
            'objetivo' => ['required', 'string', 'max:2000'],
            'meta_financeira' => ['required', 'numeric', 'min:0.01'],
            'banner' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'data_inicio' => ['required', 'date'],
            'data_fim' => ['required', 'date', 'after_or_equal:data_inicio'],
        ]);

        $campaign = DivulgadorCampaign::create([
            'account_code' => (string) ($user->divulgador_account_code ?: 'demo-divulgador'),
            'divulgador_id' => $user->id,
            'titulo' => $data['titulo'],
            'objetivo' => $data['objetivo'],
            'meta_financeira' => $data['meta_financeira'],
            'banner' => $this->storeCampaignBanner($request->file('banner')),
            'data_inicio' => $data['data_inicio'],
            'data_fim' => $data['data_fim'],
            'nome_campanha' => $data['titulo'],
            'meta_total' => (int) round((float) $data['meta_financeira']),
            'progresso_atual' => 0,
            'link_divulgacao' => null,
        ]);

        return redirect()
            ->route('divulgador.dashboard', ['edit_campaign' => $campaign->id])
            ->with('status', 'Campanha criada com sucesso.');
    }

    public function updateCampaign(Request $request, int $campaign): RedirectResponse
    {
        $user = $request->user('web');

        if (!$user || !$user->isDivulgadorAccount() || !$user->isDivulgadorApproved()) {
            return redirect()->route('divulgador.login.form');
        }

        $campaignModel = $this->ownedCampaignQuery($user)->findOrFail($campaign);

        $data = $request->validate([
            'titulo' => ['required', 'string', 'max:255'],
            'objetivo' => ['required', 'string', 'max:2000'],
            'meta_financeira' => ['required', 'numeric', 'min:0.01'],
            'banner' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'data_inicio' => ['required', 'date'],
            'data_fim' => ['required', 'date', 'after_or_equal:data_inicio'],
        ]);

        $banner = $campaignModel->banner;
        if ($request->hasFile('banner')) {
            $this->removeCampaignBanner($campaignModel->banner);
            $banner = $this->storeCampaignBanner($request->file('banner'));
        }

        $campaignModel->update([
            'titulo' => $data['titulo'],
            'objetivo' => $data['objetivo'],
            'meta_financeira' => $data['meta_financeira'],
            'banner' => $banner,
            'data_inicio' => $data['data_inicio'],
            'data_fim' => $data['data_fim'],
            'nome_campanha' => $data['titulo'],
            'meta_total' => (int) round((float) $data['meta_financeira']),
        ]);

        return redirect()
            ->route('divulgador.dashboard', ['edit_campaign' => $campaignModel->id])
            ->with('status', 'Campanha atualizada com sucesso.');
    }

    public function destroyCampaign(Request $request, int $campaign): RedirectResponse
    {
        $user = $request->user('web');

        if (!$user || !$user->isDivulgadorAccount() || !$user->isDivulgadorApproved()) {
            return redirect()->route('divulgador.login.form');
        }

        $campaignModel = $this->ownedCampaignQuery($user)->findOrFail($campaign);
        $this->removeCampaignBanner($campaignModel->banner);
        $campaignModel->delete();

        return redirect()
            ->route('divulgador.dashboard')
            ->with('status', 'Campanha excluída com sucesso.');
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('divulgador.login.form');
    }

    public function analysing(): View
    {
        return view('divulgador.auth.analisando', [
            'divulgadorName' => session('divulgador_name'),
            'divulgadorEmail' => session('divulgador_email'),
            'divulgadorAccountCode' => session('divulgador_account_code'),
            'divulgadorStatus' => session('divulgador_status', 'pending'),
        ]);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function buildSummaryCards(User $user, array $metrics): array
    {
        $cards = [
            [
                'label' => 'Campanhas ativas',
                'value' => number_format($metrics['campaigns_active'] ?? 0, 0, ',', '.'),
                'hint' => 'Campanhas em andamento ou prontas para divulgar',
                'icon' => '🎯',
                'tone' => 'blue',
            ],
            [
                'label' => 'Produtos',
                'value' => number_format($metrics['products_count'] ?? 0, 0, ',', '.'),
                'hint' => 'Itens vinculados ao account code atual',
                'icon' => '📦',
                'tone' => 'green',
            ],
            [
                'label' => 'Links gerados',
                'value' => number_format($metrics['links_count'] ?? 0, 0, ',', '.'),
                'hint' => 'URLs prontas para compartilhamento',
                'icon' => '🔗',
                'tone' => 'amber',
            ],
            [
                'label' => 'Compradores',
                'value' => number_format($metrics['sales_count'] ?? 0, 0, ',', '.'),
                'hint' => 'Leads e compradores capturados',
                'icon' => '👥',
                'tone' => 'slate',
            ],
        ];

        if ($user->divulgadorHasRole('divulgador_admin')) {
            $cards[] = [
                'label' => 'Comissao estimada',
                'value' => $this->money((float) ($metrics['commission_total'] ?? 0)),
                'hint' => 'Visivel apenas para o perfil admin',
                'icon' => '💰',
                'tone' => 'emerald',
            ];
        }

        return $cards;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function buildFeaturedCampaigns(User $user, string $accountCode): array
    {
        return DivulgadorCampaign::query()
            ->where(function ($query) use ($accountCode, $user) {
                $query->where('account_code', $accountCode);

                if ($user->id) {
                    $query->orWhere('divulgador_id', $user->id);
                }
            })
            ->orderByDesc('created_at')
            ->limit(4)
            ->get()
            ->map(function (DivulgadorCampaign $campaign): array {
                $goal = (float) ($campaign->meta_financeira ?? $campaign->meta_total ?? 0);
                $progress = (float) ($campaign->progresso_atual ?? 0);
                $progressPercent = (int) min(100, round(($progress / max(1, $goal)) * 100));

                return [
                    'id' => $campaign->id,
                    'title' => $campaign->titulo ?: $campaign->nome_campanha,
                    'objective' => $campaign->objetivo ?: '',
                    'product' => $campaign->produto_nome ?: 'Produto nao informado',
                    'supplier' => $campaign->fornecedor_nome ?: 'Fornecedor nao informado',
                    'goal' => $this->money($goal),
                    'progress' => $this->money($progress),
                    'progress_percent' => $progressPercent,
                    'status' => $campaign->status,
                    'link' => $campaign->link_divulgacao,
                    'period' => $campaign->data_inicio && $campaign->data_fim
                        ? optional($campaign->data_inicio)->format('d/m/Y') . ' a ' . optional($campaign->data_fim)->format('d/m/Y')
                        : '',
                ];
            })
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function buildCampaignRows(User $user, string $accountCode): array
    {
        return $this->ownedCampaignQuery($user, $accountCode)
            ->orderByDesc('created_at')
            ->get()
            ->map(function (DivulgadorCampaign $campaign): array {
                $goal = (float) ($campaign->meta_financeira ?? $campaign->meta_total ?? 0);
                $progress = (float) ($campaign->progresso_atual ?? 0);
                $progressPercent = (int) min(100, round(($progress / max(1, $goal)) * 100));

                return [
                    'id' => $campaign->id,
                    'title' => $campaign->titulo ?: $campaign->nome_campanha,
                    'objective' => $campaign->objetivo ?: '',
                    'product' => $campaign->produto_nome ?: 'Produto nao informado',
                    'supplier' => $campaign->fornecedor_nome ?: 'Fornecedor nao informado',
                    'goal' => $this->money($goal),
                    'progress' => $this->money($progress),
                    'progress_percent' => $progressPercent,
                    'status' => $campaign->status,
                    'banner_url' => $campaign->banner_url,
                    'link_divulgacao' => $campaign->link_divulgacao,
                    'data_inicio' => optional($campaign->data_inicio)->format('Y-m-d'),
                    'data_fim' => optional($campaign->data_fim)->format('Y-m-d'),
                    'data_inicio_formatada' => optional($campaign->data_inicio)->format('d/m/Y'),
                    'data_fim_formatada' => optional($campaign->data_fim)->format('d/m/Y'),
                    'created_at' => optional($campaign->created_at)->format('d/m/Y H:i'),
                ];
            })
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function buildRecentProducts(string $accountCode): array
    {
        return DivulgadorProduct::query()
            ->where('account_code', $accountCode)
            ->orderByDesc('id')
            ->limit(6)
            ->get()
            ->map(function (DivulgadorProduct $product): array {
                return [
                    'codigo' => 'DIV-' . str_pad((string) $product->id, 3, '0', STR_PAD_LEFT),
                    'product' => $product->name,
                    'value' => $this->money((float) $product->price),
                    'stock' => (int) $product->stock,
                    'status' => $product->status ?: 'Ativo',
                    'status_class' => ((int) $product->stock <= 0) ? 'danger' : 'success',
                ];
            })
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function buildRecentSales(string $accountCode, User $user, array $recentProducts): array
    {
        $productNames = collect($recentProducts)->pluck('product')->filter()->values()->all();

        return DivulgadorDonation::query()
            ->where('account_code', $accountCode)
            ->orderByDesc('donation_date')
            ->limit(6)
            ->get()
            ->values()
            ->map(function (DivulgadorDonation $donation, int $index) use ($productNames, $user): array {
                return [
                    'buyer' => $donation->donor_name,
                    'product' => $productNames[$index % max(1, count($productNames))] ?? 'Produto nao informado',
                    'divulgador' => $user->full_name,
                    'value' => $this->money((float) $donation->purchase_value),
                    'date' => optional($donation->donation_date)->format('d/m/Y'),
                    'status' => $donation->status,
                ];
            })
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function buildStockSummary(string $accountCode): array
    {
        $stocks = DivulgadorProduct::query()
            ->where('account_code', $accountCode)
            ->pluck('stock')
            ->map(fn ($value) => (int) $value);

        if ($stocks->isEmpty()) {
            return [
                'high' => 0,
                'low' => 0,
                'zero' => 0,
                'total' => 0,
            ];
        }

        return [
            'high' => $stocks->filter(fn (int $value) => $value >= 20)->count(),
            'low' => $stocks->filter(fn (int $value) => $value > 0 && $value < 20)->count(),
            'zero' => $stocks->filter(fn (int $value) => $value <= 0)->count(),
            'total' => (int) $stocks->sum(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function buildMetrics(string $accountCode, array $featuredCampaigns, array $recentProducts, array $recentSales, array $stockSummary): array
    {
        $salesTotal = collect($recentSales)->sum(function (array $sale): float {
            return (float) str_replace(['R$ ', '.', ','], ['', '', '.'], $sale['value'] ?? '0');
        });

        $linksCount = DivulgadorLink::query()->where('account_code', $accountCode)->count();

        return [
            'products_count' => count($recentProducts) ?: DivulgadorProduct::query()->where('account_code', $accountCode)->count(),
            'stock_total' => $stockSummary['total'] ?? 0,
            'campaigns_active' => collect($featuredCampaigns)->where('status', 'ativa')->count(),
            'sales_count' => count($recentSales),
            'links_count' => $linksCount,
            'total_sold' => $salesTotal,
            'amount_receivable' => (float) DivulgadorDonation::query()
                ->where('account_code', $accountCode)
                ->where('status', 'Pendente')
                ->sum('donation_value'),
            'commission_total' => (float) DivulgadorDonation::query()
                ->where('account_code', $accountCode)
                ->where('status', 'Recebido')
                ->sum('donation_value'),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function buildMenuItems(User $user): array
    {
        $items = [
            ['label' => 'Dashboard', 'href' => route('divulgador.dashboard'), 'active' => true],
            ['label' => 'Campanhas', 'href' => '#campanhas', 'active' => false],
            ['label' => 'Gerenciar', 'href' => '#gerenciar-campanhas', 'active' => false],
            ['label' => 'Links', 'href' => '#links', 'active' => false],
            ['label' => 'Compradores', 'href' => '#compradores', 'active' => false],
        ];

        if ($user->divulgadorHasRole('divulgador_admin')) {
            $items[] = ['label' => 'Financeiro', 'href' => '#financeiro', 'active' => false];
        }

        $items[] = ['label' => 'Sair', 'href' => route('divulgador.logout'), 'active' => false, 'method' => 'post'];

        return $items;
    }

    /**
     * @return array<string, mixed>
     */
    private function buildFinancialSummary(string $accountCode, array $recentSales): array
    {
        $donations = DivulgadorDonation::query()
            ->where('account_code', $accountCode)
            ->get();

        $received = (float) $donations->where('status', 'Recebido')->sum('donation_value');
        $pending = (float) $donations->where('status', 'Pendente')->sum('donation_value');
        $totalSold = (float) collect($recentSales)->sum(function (array $sale): float {
            return (float) str_replace(['R$ ', '.', ','], ['', '', '.'], $sale['value'] ?? '0');
        });
        $ticketAvg = $donations->count() > 0 ? $totalSold / $donations->count() : 0;

        return [
            'formatted' => [
                'total_sold' => $this->money($totalSold),
                'received' => $this->money($received),
                'pending' => $this->money($pending),
                'ticket_avg' => $this->money($ticketAvg),
            ],
            'donations_count' => $donations->count(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function buildCampaignFormData(?array $campaign): array
    {
        return [
            'id' => $campaign['id'] ?? null,
            'titulo' => $campaign['title'] ?? '',
            'objetivo' => $campaign['objective'] ?? '',
            'meta_financeira' => isset($campaign['goal'])
                ? (float) str_replace(['R$ ', '.', ','], ['', '', '.'], $campaign['goal'])
                : 0,
            'data_inicio' => $campaign['data_inicio'] ?? '',
            'data_fim' => $campaign['data_fim'] ?? '',
            'banner_url' => $campaign['banner_url'] ?? null,
        ];
    }

    private function ownedCampaignQuery(User $user, ?string $accountCode = null)
    {
        $code = $accountCode ?: (string) ($user->divulgador_account_code ?: 'demo-divulgador');

        return DivulgadorCampaign::query()->where(function ($query) use ($user, $code) {
            $query->where('account_code', $code);

            if ($user->id) {
                $query->orWhere('divulgador_id', $user->id);
            }
        });
    }

    private function storeCampaignBanner(?\Illuminate\Http\UploadedFile $file): ?string
    {
        if (!$file) {
            return null;
        }

        return $file->store('campanhas/banners', 'public');
    }

    private function removeCampaignBanner(?string $banner): void
    {
        if (!$banner || Str::startsWith($banner, ['http://', 'https://'])) {
            return;
        }

        Storage::disk('public')->delete($banner);
    }

    private function money(float $value): string
    {
        return 'R$ ' . number_format($value, 2, ',', '.');
    }
}
