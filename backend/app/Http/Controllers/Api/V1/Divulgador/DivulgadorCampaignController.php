<?php

namespace App\Http\Controllers\Api\V1\Divulgador;

use App\Http\Controllers\Api\V1\Controller;
use App\Http\Requests\DivulgadorCampaignRequest;
use App\Models\DivulgadorCampaign;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DivulgadorCampaignController extends Controller
{
    private function accountCode(Request $request): string
    {
        return (string) ($request->user()?->divulgador_account_code ?: 'demo-divulgador');
    }

    private function ownedQuery(Request $request)
    {
        $user = $request->user();
        $code = $this->accountCode($request);

        return DivulgadorCampaign::query()->where(function ($query) use ($user, $code) {
            $query->where('account_code', $code);

            if ($user?->id) {
                $query->orWhere('divulgador_id', $user->id);
            }
        });
    }

    private function storeBanner(?\Illuminate\Http\UploadedFile $file): ?string
    {
        if (!$file) {
            return null;
        }

        return $file->store('campanhas/banners', 'public');
    }

    private function removeBanner(?string $banner): void
    {
        if (!$banner || Str::startsWith($banner, ['http://', 'https://'])) {
            return;
        }

        Storage::disk('public')->delete($banner);
    }

    private function formatCampaign(DivulgadorCampaign $campaign): array
    {
        return [
            'id' => $campaign->id,
            'titulo' => $campaign->titulo ?: $campaign->nome_campanha,
            'objetivo' => $campaign->objetivo ?: '',
            'meta_financeira' => (float) ($campaign->meta_financeira ?? $campaign->meta_total ?? 0),
            'banner' => $campaign->banner,
            'banner_url' => $campaign->banner_url,
            'data_inicio' => optional($campaign->data_inicio)->format('Y-m-d'),
            'data_inicio_formatada' => optional($campaign->data_inicio)->format('d/m/Y'),
            'data_fim' => optional($campaign->data_fim)->format('Y-m-d'),
            'data_fim_formatada' => optional($campaign->data_fim)->format('d/m/Y'),
            'status' => $campaign->status,
            'link_divulgacao' => $campaign->link_divulgacao,
            'meta_total' => (int) $campaign->meta_total,
            'progresso_atual' => (int) $campaign->progresso_atual,
            'created_at' => optional($campaign->created_at)->format('d/m/Y H:i'),
            'updated_at' => optional($campaign->updated_at)->format('d/m/Y H:i'),
        ];
    }

    public function index(Request $request): JsonResponse
    {
        $campaigns = $this->ownedQuery($request)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (DivulgadorCampaign $campaign) => $this->formatCampaign($campaign))
            ->values();

        return response()->json([
            'campaigns' => $campaigns,
        ]);
    }

    public function store(DivulgadorCampaignRequest $request): JsonResponse
    {
        $user = $request->user();
        $code = $this->accountCode($request);
        $banner = $this->storeBanner($request->file('banner'));

        $campaign = DivulgadorCampaign::create([
            'account_code' => $code,
            'divulgador_id' => $user?->id,
            'titulo' => (string) $request->input('titulo'),
            'objetivo' => (string) $request->input('objetivo'),
            'meta_financeira' => $request->input('meta_financeira'),
            'banner' => $banner,
            'data_inicio' => $request->input('data_inicio'),
            'data_fim' => $request->input('data_fim'),
            'nome_campanha' => (string) $request->input('titulo'),
            'meta_total' => (int) round((float) $request->input('meta_financeira')),
            'progresso_atual' => 0,
            'link_divulgacao' => null,
            'status' => 'ativa',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Campanha criada com sucesso.',
            'campaign' => $this->formatCampaign($campaign),
        ], 201);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $campaign = $this->ownedQuery($request)->findOrFail($id);

        return response()->json([
            'campaign' => $this->formatCampaign($campaign),
        ]);
    }

    public function update(DivulgadorCampaignRequest $request, int $id): JsonResponse
    {
        $campaign = $this->ownedQuery($request)->findOrFail($id);
        $banner = $campaign->banner;

        if ($request->hasFile('banner')) {
            $this->removeBanner($campaign->banner);
            $banner = $this->storeBanner($request->file('banner'));
        }

        $campaign->update([
            'titulo' => (string) $request->input('titulo'),
            'objetivo' => (string) $request->input('objetivo'),
            'meta_financeira' => $request->input('meta_financeira'),
            'banner' => $banner,
            'data_inicio' => $request->input('data_inicio'),
            'data_fim' => $request->input('data_fim'),
            'nome_campanha' => (string) $request->input('titulo'),
            'meta_total' => (int) round((float) $request->input('meta_financeira')),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Campanha atualizada com sucesso.',
            'campaign' => $this->formatCampaign($campaign->fresh()),
        ]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $campaign = $this->ownedQuery($request)->findOrFail($id);
        $this->removeBanner($campaign->banner);
        $campaign->delete();

        return response()->json([
            'success' => true,
            'message' => 'Campanha excluída com sucesso.',
        ]);
    }
}
