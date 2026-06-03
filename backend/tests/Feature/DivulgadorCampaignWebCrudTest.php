<?php

namespace Tests\Feature;

use App\Models\DivulgadorCampaign;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tests\TestCase;

class DivulgadorCampaignWebCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_divulgador_can_manage_campaigns_from_dashboard(): void
    {
        Storage::fake('public');
        $this->withoutMiddleware(ValidateCsrfToken::class);

        $user = $this->createDivulgadorUser();

        $createResponse = $this->actingAs($user, 'web')->post('/divulgador/campanhas', [
            'titulo' => 'Campanha Web',
            'objetivo' => 'Criada pela interface web do dashboard.',
            'meta_financeira' => 1200.50,
            'data_inicio' => now()->subDay()->format('Y-m-d'),
            'data_fim' => now()->addDays(7)->format('Y-m-d'),
            'banner' => UploadedFile::fake()->image('banner-web.jpg'),
        ]);

        $createResponse->assertRedirect();

        $campaign = DivulgadorCampaign::query()->firstOrFail();

        $this->assertDatabaseHas('divulgador_campaigns', [
            'id' => $campaign->id,
            'titulo' => 'Campanha Web',
            'account_code' => $user->divulgador_account_code,
            'divulgador_id' => $user->id,
        ]);

        $updateResponse = $this->actingAs($user, 'web')->put("/divulgador/campanhas/{$campaign->id}", [
            'titulo' => 'Campanha Web Atualizada',
            'objetivo' => 'Atualizada pela mesma tela.',
            'meta_financeira' => 2500.75,
            'data_inicio' => now()->subDays(2)->format('Y-m-d'),
            'data_fim' => now()->addDays(10)->format('Y-m-d'),
        ]);

        $updateResponse->assertRedirect();

        $this->assertDatabaseHas('divulgador_campaigns', [
            'id' => $campaign->id,
            'titulo' => 'Campanha Web Atualizada',
        ]);

        $deleteResponse = $this->actingAs($user, 'web')->delete("/divulgador/campanhas/{$campaign->id}");

        $deleteResponse->assertRedirect(route('divulgador.dashboard'));

        $this->assertDatabaseMissing('divulgador_campaigns', [
            'id' => $campaign->id,
        ]);
    }

    private function createDivulgadorUser(string $accountCode = 'demo-divulgador'): User
    {
        return User::query()->create([
            'first_name' => 'Admin',
            'last_name' => 'Divulgador',
            'slug' => 'admin-divulgador-' . Str::random(8),
            'email' => 'admin.divulgador.' . Str::random(6) . '@example.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'activity_scope' => 'divulgador_level',
            'account_type' => 'divulgador',
            'divulgador_account_code' => $accountCode,
            'divulgador_status' => 'approved',
            'status' => 1,
        ]);
    }
}
