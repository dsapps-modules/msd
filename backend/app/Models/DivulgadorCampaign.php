<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class DivulgadorCampaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_code',
        'divulgador_id',
        'titulo',
        'objetivo',
        'meta_financeira',
        'banner',
        'data_fim',
        'nome_campanha',
        'produto_nome',
        'fornecedor_nome',
        'meta_total',
        'progresso_atual',
        'link_divulgacao',
        'data_inicio',
        'status',
    ];

    protected $casts = [
        'meta_financeira' => 'decimal:2',
        'meta_total' => 'integer',
        'progresso_atual' => 'integer',
        'data_inicio' => 'date',
        'data_fim' => 'date',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $campaign) {
            $campaign->status = self::resolveStatus(
                $campaign->data_inicio,
                $campaign->data_fim
            );
        });
    }

    public static function resolveStatus($dataInicio, $dataFim): string
    {
        $start = $dataInicio ? $dataInicio->copy()->startOfDay() : null;
        $end = $dataFim ? $dataFim->copy()->endOfDay() : null;
        $now = now();

        if ($start && $now->lt($start)) {
            return 'futura';
        }

        if ($end && $now->gt($end)) {
            return 'encerrada';
        }

        return 'ativa';
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'divulgador_id');
    }

    public function links()
    {
        return $this->hasMany(DivulgadorLink::class, 'campaign_id');
    }

    public function getBannerUrlAttribute(): ?string
    {
        if (!$this->banner) {
            return null;
        }

        if (Str::startsWith($this->banner, ['http://', 'https://'])) {
            return $this->banner;
        }

        return asset('storage/' . ltrim($this->banner, '/'));
    }
}
