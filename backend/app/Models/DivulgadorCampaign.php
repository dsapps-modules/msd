<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DivulgadorCampaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_code',
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
        'meta_total' => 'integer',
        'progresso_atual' => 'integer',
        'data_inicio' => 'date',
    ];
}
