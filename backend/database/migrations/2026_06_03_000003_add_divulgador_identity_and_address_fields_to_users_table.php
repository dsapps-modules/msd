<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'cnpj')) {
                $table->string('cnpj', 18)->nullable()->after('cpf');
            }

            if (!Schema::hasColumn('users', 'cep')) {
                $table->string('cep', 9)->nullable()->after('cnpj');
            }

            if (!Schema::hasColumn('users', 'street_type')) {
                $table->string('street_type')->nullable()->after('cep');
            }

            if (!Schema::hasColumn('users', 'street_name')) {
                $table->string('street_name')->nullable()->after('street_type');
            }

            if (!Schema::hasColumn('users', 'street_number')) {
                $table->string('street_number')->nullable()->after('street_name');
            }

            if (!Schema::hasColumn('users', 'street_complement')) {
                $table->string('street_complement')->nullable()->after('street_number');
            }

            if (!Schema::hasColumn('users', 'street_neighborhood')) {
                $table->string('street_neighborhood')->nullable()->after('street_complement');
            }

            if (!Schema::hasColumn('users', 'street_city')) {
                $table->string('street_city')->nullable()->after('street_neighborhood');
            }

            if (!Schema::hasColumn('users', 'street_state')) {
                $table->string('street_state', 2)->nullable()->after('street_city');
            }

            if (!Schema::hasColumn('users', 'address')) {
                $table->text('address')->nullable()->after('street_state');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
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
                'address',
            ];

            $existing = array_filter($columns, fn ($column) => Schema::hasColumn('users', $column));

            if ($existing) {
                $table->dropColumn($existing);
            }
        });
    }
};
