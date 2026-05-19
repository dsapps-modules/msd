<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DivulgadorLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_code',
        'campaign_id',
        'divulgador_id',
        'divulgador_product_id',
        'code',
        'url',
        'status',
        'commission_value',
    ];

    protected $casts = [
        'commission_value' => 'decimal:2',
    ];

    public function product()
    {
        return $this->belongsTo(DivulgadorProduct::class, 'divulgador_product_id');
    }

    public function campaign()
    {
        return $this->belongsTo(DivulgadorCampaign::class, 'campaign_id');
    }
}
