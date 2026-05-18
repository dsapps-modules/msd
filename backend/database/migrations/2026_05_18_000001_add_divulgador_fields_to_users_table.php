<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('account_type')->nullable()->after('activity_scope');
            $table->string('divulgador_account_code')->nullable()->index()->after('account_type');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['divulgador_account_code']);
            $table->dropColumn(['account_type', 'divulgador_account_code']);
        });
    }
};
