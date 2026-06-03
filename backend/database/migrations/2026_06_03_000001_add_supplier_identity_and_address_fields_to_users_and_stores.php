<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'birth_day')) {
                $table->date('birth_day')->nullable()->after('last_name');
            }

            if (!Schema::hasColumn('users', 'cpf')) {
                $table->string('cpf', 14)->nullable()->after('birth_day');
            }
        });

        Schema::table('stores', function (Blueprint $table) {
            if (!Schema::hasColumn('stores', 'cnpj')) {
                $table->string('cnpj', 18)->nullable()->after('tax_number');
            }

            if (!Schema::hasColumn('stores', 'cep')) {
                $table->string('cep', 9)->nullable()->after('address');
            }

            if (!Schema::hasColumn('stores', 'street_type')) {
                $table->string('street_type')->nullable()->after('cep');
            }

            if (!Schema::hasColumn('stores', 'street_name')) {
                $table->string('street_name')->nullable()->after('street_type');
            }

            if (!Schema::hasColumn('stores', 'street_number')) {
                $table->string('street_number')->nullable()->after('street_name');
            }

            if (!Schema::hasColumn('stores', 'street_complement')) {
                $table->string('street_complement')->nullable()->after('street_number');
            }

            if (!Schema::hasColumn('stores', 'street_neighborhood')) {
                $table->string('street_neighborhood')->nullable()->after('street_complement');
            }

            if (!Schema::hasColumn('stores', 'street_city')) {
                $table->string('street_city')->nullable()->after('street_neighborhood');
            }

            if (!Schema::hasColumn('stores', 'street_state')) {
                $table->string('street_state', 2)->nullable()->after('street_city');
            }
        });
    }

    public function down(): void
    {
        Schema::table('stores', function (Blueprint $table) {
            $columns = [
                'cnpj',
                'cep',
                'street_type',
                'street_name',
                'street_number',
                'street_complement',
                'street_neighborhood',
                'street_city',
                'street_state',
            ];

            $existing = array_filter($columns, fn ($column) => Schema::hasColumn('stores', $column));

            if ($existing) {
                $table->dropColumn($existing);
            }
        });

        Schema::table('users', function (Blueprint $table) {
            $columns = ['birth_day', 'cpf'];

            $existing = array_filter($columns, fn ($column) => Schema::hasColumn('users', $column));

            if ($existing) {
                $table->dropColumn($existing);
            }
        });
    }
};
