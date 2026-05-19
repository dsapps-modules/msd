<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('divulgador_campaigns', function (Blueprint $table) {
            $table->foreignId('divulgador_id')
                ->nullable()
                ->after('account_code')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->string('titulo')->nullable()->after('divulgador_id');
            $table->text('objetivo')->nullable()->after('titulo');
            $table->decimal('meta_financeira', 10, 2)->nullable()->after('objetivo');
            $table->string('banner')->nullable()->after('meta_financeira');
            $table->date('data_fim')->nullable()->after('data_inicio');
            $table->string('nome_campanha')->nullable()->change();
            $table->string('produto_nome')->nullable()->change();
            $table->string('fornecedor_nome')->nullable()->change();
            $table->unsignedInteger('meta_total')->nullable()->change();
            $table->unsignedInteger('progresso_atual')->nullable()->change();
            $table->string('link_divulgacao')->nullable()->change();
        });

        Schema::table('divulgador_links', function (Blueprint $table) {
            $table->foreignId('campaign_id')
                ->nullable()
                ->after('account_code')
                ->constrained('divulgador_campaigns')
                ->nullOnDelete();
            $table->foreignId('divulgador_id')
                ->nullable()
                ->after('campaign_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignId('divulgador_product_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('divulgador_links', function (Blueprint $table) {
            $table->dropConstrainedForeignId('campaign_id');
            $table->dropConstrainedForeignId('divulgador_id');
            $table->foreignId('divulgador_product_id')->nullable(false)->change();
        });

        Schema::table('divulgador_campaigns', function (Blueprint $table) {
            $table->dropConstrainedForeignId('divulgador_id');
            $table->dropColumn(['titulo', 'objetivo', 'meta_financeira', 'banner', 'data_fim']);
            $table->string('nome_campanha')->nullable(false)->change();
            $table->string('produto_nome')->nullable(false)->change();
            $table->string('fornecedor_nome')->nullable(false)->change();
            $table->unsignedInteger('meta_total')->nullable(false)->change();
            $table->unsignedInteger('progresso_atual')->nullable(false)->change();
            $table->string('link_divulgacao')->nullable(false)->change();
        });
    }
};
