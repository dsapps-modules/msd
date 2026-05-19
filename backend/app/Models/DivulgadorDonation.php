<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DivulgadorDonation extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_code',
        'donor_name',
        'purchase_value',
        'donation_value',
        'donation_date',
        'status',
    ];

    protected $casts = [
        'purchase_value' => 'decimal:2',
        'donation_value' => 'decimal:2',
        'donation_date' => 'date',
    ];
}
