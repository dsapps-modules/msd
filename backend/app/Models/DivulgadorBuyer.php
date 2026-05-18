<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DivulgadorBuyer extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_code',
        'divulgador_product_id',
        'name',
        'email',
        'phone',
    ];

    public function product()
    {
        return $this->belongsTo(DivulgadorProduct::class, 'divulgador_product_id');
    }
}
