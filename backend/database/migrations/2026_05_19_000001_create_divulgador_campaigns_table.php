<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('divulgador_campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('account_code')->index();
            $table->string('nome_campanha');
            $table->string('produto_nome');
            $table->string('fornecedor_nome');
            $table->unsignedInteger('meta_total')->default(0);
            $table->unsignedInteger('progresso_atual')->default(0);
            $table->string('link_divulgacao');
            $table->date('data_inicio');
            $table->string('status')->default('ativa');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('divulgador_campaigns');
    }
};
