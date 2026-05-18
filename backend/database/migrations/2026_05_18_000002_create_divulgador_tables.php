<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('divulgador_products', function (Blueprint $table) {
            $table->id();
            $table->string('account_code')->index();
            $table->string('name');
            $table->string('supplier_name');
            $table->decimal('price', 10, 2);
            $table->unsignedInteger('stock')->default(0);
            $table->string('status')->default('Ativo');
            $table->timestamps();
        });

        Schema::create('divulgador_links', function (Blueprint $table) {
            $table->id();
            $table->string('account_code')->index();
            $table->foreignId('divulgador_product_id')->constrained('divulgador_products')->cascadeOnDelete();
            $table->string('code')->unique();
            $table->string('url');
            $table->string('status')->default('Ativo');
            $table->decimal('commission_value', 10, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('divulgador_buyers', function (Blueprint $table) {
            $table->id();
            $table->string('account_code')->index();
            $table->foreignId('divulgador_product_id')->constrained('divulgador_products')->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone', 30);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('divulgador_buyers');
        Schema::dropIfExists('divulgador_links');
        Schema::dropIfExists('divulgador_products');
    }
};
