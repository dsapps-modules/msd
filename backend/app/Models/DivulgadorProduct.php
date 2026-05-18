<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DivulgadorProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_code',
        'name',
        'supplier_name',
        'price',
        'stock',
        'status',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    public function links()
    {
        return $this->hasMany(DivulgadorLink::class);
    }

    public function buyers()
    {
        return $this->hasMany(DivulgadorBuyer::class);
    }
}
