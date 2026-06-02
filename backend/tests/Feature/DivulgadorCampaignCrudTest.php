<?php

namespace Tests\Feature;

use App\Models\DivulgadorCampaign;
use App\Models\DivulgadorLink;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class DivulgadorCampaignCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_divulgador_can_crud_campaigns_and_generate_links(): void
    {
        Storage::fake('public');
        $this->withoutMiddleware();

        $user = $this->createDivulgadorUser();

        $createResponse = $this->actingAs($user, 'sanctum')->post('/api/v1/divulgador/campanhas', [
            'titulo' => 'Campanha Teste',
            'objetivo' => 'Objetivo da campanha teste.',
            'meta_financeira' => 1500.00,
            'data_inicio' => now()->subDay()->format('Y-m-d'),
            'data_fim' => now()->addDays(2)->format('Y-m-d'),
            'banner' => UploadedFile::fake()->image('banner.jpg'),
        ]);

        $createResponse->assertCreated();
        $createResponse->assertJsonPath('success', true);

        $campaignId = (int) $createResponse->json('campaign.id');

        $this->assertDatabaseHas('divulgador_campaigns', [
            'id' => $campaignId,
            'account_code' => $user->divulgador_account_code,
            'divulgador_id' => $user->id,
            'titulo' => 'Campanha Teste',
        ]);
        $this->assertSame('ativa', DivulgadorCampaign::query()->findOrFail($campaignId)->status);

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/divulgador/campanhas')
            ->assertOk()
            ->assertJsonFragment([
                'titulo' => 'Campanha Teste',
            ]);

        $this->actingAs($user, 'sanctum')
            ->getJson("/api/v1/divulgador/campanhas/{$campaignId}")
            ->assertOk()
            ->assertJsonPath('campaign.id', $campaignId)
            ->assertJsonPath('campaign.titulo', 'Campanha Teste');

        $this->actingAs($user, 'sanctum')->putJson("/api/v1/divulgador/campanhas/{$campaignId}", [
            'titulo' => 'Campanha Atualizada',
            'objetivo' => 'Objetivo atualizado.',
            'meta_financeira' => 2500.00,
            'data_inicio' => now()->subDays(2)->format('Y-m-d'),
            'data_fim' => now()->addDays(5)->format('Y-m-d'),
        ])->assertOk();

        $this->assertDatabaseHas('divulgador_campaigns', [
            'id' => $campaignId,
            'titulo' => 'Campanha Atualizada',
        ]);

        $linkResponse = $this->actingAs($user, 'sanctum')->postJson('/api/v1/divulgador/links', [
            'campaign_id' => $campaignId,
        ]);

        $linkResponse->assertCreated();
        $linkResponse->assertJsonPath('link.campaign_title', 'Campanha Atualizada');

        $this->assertDatabaseHas('divulgador_links', [
            'campaign_id' => $campaignId,
            'account_code' => $user->divulgador_account_code,
            'divulgador_id' => $user->id,
        ]);

        $futureCampaign = DivulgadorCampaign::query()->create([
            'account_code' => $user->divulgador_account_code,
            'divulgador_id' => $user->id,
            'titulo' => 'Campanha Futura',
            'objetivo' => 'Campanha que ainda não iniciou.',
            'meta_financeira' => 1000,
            'banner' => 'https://placehold.co/1200x675',
            'data_inicio' => now()->addDays(10)->format('Y-m-d'),
            'data_fim' => now()->addDays(20)->format('Y-m-d'),
            'nome_campanha' => 'Campanha Futura',
            'meta_total' => 1000,
            'progresso_atual' => 0,
            'status' => 'ativa',
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/divulgador/links', [
                'campaign_id' => $futureCampaign->id,
            ])
            ->assertStatus(422);

        $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/v1/divulgador/campanhas/{$campaignId}")
            ->assertOk()
            ->assertJsonPath('success', true);

        $this->assertDatabaseMissing('divulgador_campaigns', [
            'id' => $campaignId,
        ]);
    }

    public function test_divulgador_cannot_access_campaigns_from_other_account(): void
    {
        $this->withoutMiddleware();

        $owner = $this->createDivulgadorUser('demo-owner', 'Owner');
        $other = $this->createDivulgadorUser('other-owner', 'Other');

        $campaign = DivulgadorCampaign::query()->create([
            'account_code' => $owner->divulgador_account_code,
            'divulgador_id' => $owner->id,
            'titulo' => 'Campanha Privada',
            'objetivo' => 'Apenas do dono.',
            'meta_financeira' => 1000,
            'banner' => 'https://placehold.co/1200x675',
            'data_inicio' => now()->subDay()->format('Y-m-d'),
            'data_fim' => now()->addDay()->format('Y-m-d'),
            'nome_campanha' => 'Campanha Privada',
            'meta_total' => 1000,
            'progresso_atual' => 100,
            'status' => 'ativa',
        ]);

        $this->actingAs($other, 'sanctum')
            ->getJson("/api/v1/divulgador/campanhas/{$campaign->id}")
            ->assertStatus(404);
    }

    private function createDivulgadorUser(string $accountCode = 'demo-divulgador', string $nameSuffix = 'Divulgador'): User
    {
        $role = Role::findOrCreate('divulgador_admin', 'api');

        $user = User::query()->create([
            'first_name' => 'Admin',
            'last_name' => $nameSuffix,
            'slug' => Str::slug($nameSuffix . '-' . Str::random(6)),
            'phone' => '11999990000',
            'email' => Str::lower($nameSuffix) . '-' . Str::random(4) . '@example.com',
            'email_verified' => true,
            'password' => bcrypt('password'),
            'activity_scope' => 'divulgador_level',
            'account_type' => 'divulgador',
            'divulgador_account_code' => $accountCode,
            'status' => 1,
        ]);

        $user->assignRole($role);

        return $user;
    }
}
