<?php

namespace App\Http\Controllers\Api\V1\Divulgador;

use App\Http\Controllers\Api\V1\Controller;
use App\Models\DivulgadorBuyer;
use App\Models\DivulgadorCampaign;
use App\Models\DivulgadorDonation;
use App\Models\DivulgadorLink;
use App\Models\DivulgadorProduct;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DivulgadorDashboardController extends Controller
{
    private function accountCode(Request $request): string
    {
        return (string) ($request->user()?->divulgador_account_code ?: 'demo-divulgador');
    }

    private function summaryData(Request $request): array
    {
        $user = $request->user();
        $isAdmin = $user?->divulgadorHasRole('divulgador_admin') ?? false;

        return [
            'products_available' => 24,
            'buyers_captured' => 138,
            'active_links' => 17,
            'commission_estimated' => $isAdmin ? 4780.00 : null,
            'role_label' => $isAdmin ? 'Admin' : 'Colaborador',
            'can_view_financials' => $isAdmin,
        ];
    }

    private function productList(Request $request)
    {
        $code = $this->accountCode($request);

        return DivulgadorProduct::query()
            ->where('account_code', $code)
            ->orderBy('name')
            ->get()
            ->map(function (DivulgadorProduct $product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'supplier_name' => $product->supplier_name,
                    'price' => (float) $product->price,
                    'stock' => $product->stock,
                    'status' => $product->status,
                    'action_label' => 'Gerar link',
                ];
            });
    }

    private function buyerList(Request $request)
    {
        $code = $this->accountCode($request);

        return DivulgadorBuyer::query()
            ->with(['product:id,name'])
            ->where('account_code', $code)
            ->latest()
            ->get()
            ->map(function (DivulgadorBuyer $buyer) {
                return [
                    'id' => $buyer->id,
                    'name' => $buyer->name,
                    'email' => $buyer->email,
                    'phone' => $buyer->phone,
                    'product_interest' => $buyer->product?->name,
                    'created_at' => optional($buyer->created_at)->format('d/m/Y'),
                ];
            });
    }

    private function linkList(Request $request)
    {
        $code = $this->accountCode($request);

        return DivulgadorLink::query()
            ->with(['campaign:id,titulo,status', 'product:id,name'])
            ->where('account_code', $code)
            ->latest('created_at')
            ->get()
            ->map(function (DivulgadorLink $link) {
                return [
                    'id' => $link->id,
                    'campaign_title' => $link->campaign?->titulo,
                    'product_name' => $link->product?->name,
                    'code' => $link->code,
                    'url' => $link->url,
                    'status' => $link->status,
                    'commission_value' => (float) $link->commission_value,
                ];
            });
    }

    private function campaignList(Request $request)
    {
        $code = $this->accountCode($request);

        return DivulgadorCampaign::query()
            ->where(function ($query) use ($code, $request) {
                $query->where('account_code', $code);
                if ($request->user()?->id) {
                    $query->orWhere('divulgador_id', $request->user()->id);
                }
            })
            ->where('status', 'ativa')
            ->orderByDesc('data_inicio')
            ->limit(2)
            ->get()
            ->map(function (DivulgadorCampaign $campaign) {
                return [
                    'id' => $campaign->id,
                    'titulo' => $campaign->titulo ?: $campaign->nome_campanha,
                    'objetivo' => $campaign->objetivo ?: '',
                    'banner_url' => $campaign->banner_url,
                    'meta_financeira' => (float) ($campaign->meta_financeira ?? $campaign->meta_total ?? 0),
                    'meta_total' => (int) $campaign->meta_total,
                    'progresso_atual' => (int) $campaign->progresso_atual,
                    'link_divulgacao' => $campaign->link_divulgacao,
                    'data_inicio' => optional($campaign->data_inicio)->format('d/m/Y'),
                    'data_fim' => optional($campaign->data_fim)->format('d/m/Y'),
                    'status' => $campaign->status,
                ];
            });
    }

    private function donationList(Request $request)
    {
        $code = $this->accountCode($request);

        return DivulgadorDonation::query()
            ->where('account_code', $code)
            ->orderByDesc('donation_date')
            ->get()
            ->map(function (DivulgadorDonation $donation) {
                return [
                    'id' => $donation->id,
                    'donor_name' => $donation->donor_name,
                    'purchase_value' => (float) $donation->purchase_value,
                    'donation_value' => (float) $donation->donation_value,
                    'donation_date' => optional($donation->donation_date)->format('d/m/Y'),
                    'status' => $donation->status,
                ];
            });
    }

    private function financialSummary(Request $request): array
    {
        $donations = DivulgadorDonation::query()
            ->where('account_code', $this->accountCode($request))
            ->get();

        $receivedTotal = $donations
            ->where('status', 'Recebido')
            ->sum('donation_value');

        $pendingTotal = $donations
            ->where('status', 'Pendente')
            ->sum('donation_value');

        return [
            'received_total' => (float) $receivedTotal,
            'pending_total' => (float) $pendingTotal,
            'donations_count' => $donations->count(),
            'purchase_total' => (float) $donations->sum('purchase_value'),
        ];
    }

    public function dashboard(Request $request): JsonResponse
    {
        return response()->json([
            'summary' => $this->summaryData($request),
            'campaigns' => $this->campaignList($request),
            'products' => $this->productList($request),
            'buyers' => $this->buyerList($request),
            'links' => $this->linkList($request),
            'role' => $request->user()?->divulgadorPrimaryRoleName(),
        ]);
    }

    public function products(Request $request): JsonResponse
    {
        return response()->json([
            'summary' => $this->summaryData($request),
            'products' => $this->productList($request),
        ]);
    }

    public function buyers(Request $request): JsonResponse
    {
        return response()->json([
            'summary' => $this->summaryData($request),
            'buyers' => $this->buyerList($request),
        ]);
    }

    public function links(Request $request): JsonResponse
    {
        return response()->json([
            'summary' => $this->summaryData($request),
            'links' => $this->linkList($request),
        ]);
    }

    public function storeLink(Request $request): JsonResponse
    {
        $request->validate([
            'campaign_id' => 'required|exists:divulgador_campaigns,id',
        ]);

        $user = $request->user();
        $code = $this->accountCode($request);
        $campaign = DivulgadorCampaign::query()
            ->where(function ($query) use ($user, $code) {
                $query->where('account_code', $code);
                if ($user?->id) {
                    $query->orWhere('divulgador_id', $user->id);
                }
            })
            ->findOrFail($request->integer('campaign_id'));

        if ($campaign->status !== 'ativa') {
            return response()->json([
                'message' => 'Só é possível gerar link para campanhas ativas.',
                'status' => 422,
            ], 422);
        }

        $existingLink = DivulgadorLink::query()
            ->where('campaign_id', $campaign->id)
            ->where('account_code', $code)
            ->latest('id')
            ->first();

        if ($existingLink) {
            if (!$campaign->link_divulgacao) {
                $campaign->update([
                    'link_divulgacao' => $existingLink->url,
                ]);
            }

            return response()->json([
                'message' => 'A campanha já possui um link gerado.',
                'link' => [
                    'id' => $existingLink->id,
                    'campaign_title' => $campaign->titulo ?: $campaign->nome_campanha,
                    'code' => $existingLink->code,
                    'url' => $existingLink->url,
                    'status' => $existingLink->status,
                ],
            ]);
        }

        $generatedCode = Str::upper(Str::random(10));
        $baseUrl = rtrim((string) (config('app.frontend_url') ?: config('app.url')), '/');
        $url = $baseUrl . '/r/' . $generatedCode;

        $link = DivulgadorLink::query()->create([
            'account_code' => $code,
            'divulgador_id' => $user?->id,
            'campaign_id' => $campaign->id,
            'divulgador_product_id' => null,
            'code' => $generatedCode,
            'url' => $url,
            'status' => 'Ativo',
            'commission_value' => 0,
        ]);

        $campaign->update([
            'link_divulgacao' => $url,
        ]);

        return response()->json([
            'message' => 'Link gerado com sucesso.',
            'link' => [
                'id' => $link->id,
                'campaign_title' => $campaign->titulo ?: $campaign->nome_campanha,
                'code' => $link->code,
                'url' => $link->url,
                'status' => $link->status,
            ],
        ], 201);
    }

    public function financial(Request $request): JsonResponse
    {
        if (!$request->user()?->divulgadorHasRole('divulgador_admin')) {
            return response()->json([
                'message' => 'Forbidden',
                'status' => 403,
            ], 403);
        }

        return response()->json([
            'summary' => $this->summaryData($request),
            'financial' => $this->financialSummary($request),
            'donations' => $this->donationList($request),
        ]);
    }
}
