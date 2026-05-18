<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DivulgadorLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_code',
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
}
