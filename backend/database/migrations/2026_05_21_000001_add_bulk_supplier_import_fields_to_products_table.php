<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('account_id')->nullable()->after('store_id')->index();
            $table->string('codigo')->nullable()->after('account_id');
            $table->decimal('altura', 10, 2)->nullable()->after('codigo');
            $table->decimal('largura', 10, 2)->nullable()->after('altura');
            $table->decimal('comprimento', 10, 2)->nullable()->after('largura');
            $table->decimal('peso', 10, 3)->nullable()->after('comprimento');
            $table->string('embalagem')->nullable()->after('peso');
            $table->decimal('valor_venda', 15, 2)->nullable()->after('embalagem');
            $table->unsignedInteger('estoque_reservado')->nullable()->after('valor_venda');

            $table->unique(['account_id', 'codigo'], 'products_account_codigo_unique');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropUnique('products_account_codigo_unique');
            $table->dropColumn([
                'account_id',
                'codigo',
                'altura',
                'largura',
                'comprimento',
                'peso',
                'embalagem',
                'valor_venda',
                'estoque_reservado',
            ]);
        });
    }
};
