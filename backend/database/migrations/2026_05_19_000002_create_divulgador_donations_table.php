<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('divulgador_donations', function (Blueprint $table) {
            $table->id();
            $table->string('account_code')->index();
            $table->string('donor_name');
            $table->decimal('purchase_value', 10, 2);
            $table->decimal('donation_value', 10, 2);
            $table->date('donation_date');
            $table->string('status')->default('Pendente');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('divulgador_donations');
    }
};
