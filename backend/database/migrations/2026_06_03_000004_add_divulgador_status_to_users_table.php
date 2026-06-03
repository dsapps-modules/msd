<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('users', 'divulgador_status')) {
            Schema::table('users', function (Blueprint $table) {
                $table->enum('divulgador_status', ['pending', 'rejected', 'approved'])
                    ->default('pending')
                    ->after('status');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'divulgador_status')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('divulgador_status');
            });
        }
    }
};
