<?php

namespace App\Http\Controllers\Api\V1\Divulgador;

use App\Http\Controllers\Api\V1\Controller;
use App\Models\DivulgadorBuyer;
use App\Models\DivulgadorLink;
use App\Models\DivulgadorProduct;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
            ->with(['product:id,name'])
            ->where('account_code', $code)
            ->orderByDesc('status')
            ->get()
            ->map(function (DivulgadorLink $link) {
                return [
                    'id' => $link->id,
                    'product_name' => $link->product?->name,
                    'code' => $link->code,
                    'url' => $link->url,
                    'status' => $link->status,
                    'commission_value' => (float) $link->commission_value,
                ];
            });
    }

    public function dashboard(Request $request): JsonResponse
    {
        return response()->json([
            'summary' => $this->summaryData($request),
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
            'financial' => [
                'estimated_commissions' => 4780.00,
                'active_links' => 17,
            ],
        ]);
    }
}
