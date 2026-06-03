<?php

namespace App\Http\Controllers\Divulgador;

use App\Http\Controllers\Api\V1\Controller;
use App\Http\Requests\DivulgadorCadastroRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\View\View;
use Spatie\Permission\Models\Role;

class DivulgadorCadastroController extends Controller
{
    public function create(): View|RedirectResponse
    {
        $user = Auth::guard('web')->user();

        if ($user && $user->isDivulgadorAccount() && $user->isDivulgadorApproved()) {
            return redirect()->route('divulgador.dashboard');
        }

        if ($user && $user->isDivulgadorAccount() && $user->isDivulgadorPending()) {
            return redirect()->route('divulgador.cadastro.analisando')->with([
                'divulgador_name' => $user->full_name,
                'divulgador_email' => $user->email,
            ]);
        }

        return view('divulgador.cadastro.create');
    }

    public function store(DivulgadorCadastroRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $user = DB::transaction(function () use ($data) {
            $user = User::query()->create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'birth_day' => $data['birth_day'],
                'cpf' => $data['cpf'],
                'cnpj' => $data['cnpj'] ?? null,
                'cep' => $data['cep'],
                'street_type' => $data['street_type'],
                'street_name' => $data['street_name'],
                'street_number' => $data['street_number'],
                'street_complement' => $data['street_complement'] ?? null,
                'street_neighborhood' => $data['street_neighborhood'],
                'street_city' => $data['street_city'],
                'street_state' => strtoupper($data['street_state']),
                'address' => $this->buildFullAddress($data),
                'slug' => $this->uniqueUserSlug($data['first_name'], $data['last_name']),
                'phone' => $data['phone'],
                'email' => strtolower(trim($data['email'])),
                'email_verified' => 0,
                'email_verified_at' => null,
                'activity_scope' => 'divulgador_level',
                'account_type' => 'divulgador',
                'divulgador_account_code' => $this->uniqueAccountCode($data['first_name'], $data['last_name']),
                'password' => Hash::make($data['password']),
                'store_owner' => 0,
                'stores' => null,
                'status' => 0,
                'divulgador_status' => 'pending',
            ]);

            $role = Role::query()
                ->where('name', 'divulgador_colaborador')
                ->where('guard_name', 'api')
                ->first()
                ?? Role::query()
                    ->where('name', 'divulgador_admin')
                    ->where('guard_name', 'api')
                    ->first();

            if ($role) {
                $user->syncRoles([$role->name]);
            }

            return $user;
        });

        return redirect()
            ->route('divulgador.cadastro.analisando')
            ->with([
                'divulgador_name' => $user->full_name,
                'divulgador_email' => $user->email,
                'divulgador_account_code' => $user->divulgador_account_code,
                'divulgador_status' => $user->divulgador_status,
            ]);
    }

    private function uniqueUserSlug(string $firstName, string $lastName): string
    {
        $base = Str::slug(trim($firstName . ' ' . $lastName));
        $slug = $base;
        $suffix = 2;

        while (User::query()->where('slug', $slug)->exists()) {
            $slug = $base . '-' . $suffix++;
        }

        return $slug;
    }

    private function uniqueAccountCode(string $firstName, string $lastName): string
    {
        $base = 'divulgador-' . Str::slug(trim($firstName . ' ' . $lastName));
        $code = $base;
        $suffix = 2;

        while (User::query()->where('divulgador_account_code', $code)->exists()) {
            $code = $base . '-' . $suffix++;
        }

        return $code;
    }

    /**
     * @param array<string, mixed> $data
     */
    private function buildFullAddress(array $data): string
    {
        $parts = array_filter([
            trim(($data['street_type'] ?? '') . ' ' . ($data['street_name'] ?? '')),
            $data['street_number'] ?? null,
            $data['street_complement'] ?? null,
            $data['street_neighborhood'] ?? null,
            trim(($data['street_city'] ?? '') . '/' . strtoupper((string) ($data['street_state'] ?? ''))),
            $data['cep'] ?? null,
        ]);

        return implode(', ', $parts);
    }
}
