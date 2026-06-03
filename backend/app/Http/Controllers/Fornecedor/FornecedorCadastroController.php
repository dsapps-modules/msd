<?php

namespace App\Http\Controllers\Fornecedor;

use App\Enums\StoreType;
use App\Http\Controllers\Api\V1\Controller;
use App\Http\Requests\FornecedorCadastroRequest;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\View\View;
use Spatie\Permission\Models\Role;

class FornecedorCadastroController extends Controller
{
    public function create(): View
    {
        return view('fornecedor.cadastro.create', [
            'storeTypes' => $this->storeTypes(),
        ]);
    }

    public function store(FornecedorCadastroRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $storeType = $data['store_type'];

        $result = DB::transaction(function () use ($data, $storeType) {
            $user = User::query()->create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'birth_day' => $data['birth_day'],
                'cpf' => $data['cpf'],
                'slug' => $this->uniqueUserSlug($data['first_name'], $data['last_name']),
                'phone' => $data['phone'],
                'email' => strtolower(trim($data['email'])),
                'email_verified' => 0,
                'email_verified_at' => null,
                'activity_scope' => 'fornecedor_level',
                'account_type' => 'fornecedor',
                'password' => Hash::make($data['password']),
                'store_owner' => 0,
                'stores' => null,
                'status' => 0,
            ]);

            $role = Role::query()
                ->where('name', 'fornecedor_admin')
                ->where('guard_name', 'api')
                ->first();

            if ($role) {
                $user->syncRoles([$role->name]);
            }

            $store = Store::query()->create([
                'store_seller_id' => $user->id,
                'store_type' => $storeType,
                'name' => $data['name'],
                'slug' => $this->uniqueStoreSlug($data['name']),
                'phone' => $data['phone'],
                'email' => $user->email,
                'cnpj' => $data['cnpj'],
                'cep' => $data['cep'],
                'street_type' => $data['street_type'],
                'street_name' => $data['street_name'],
                'street_number' => $data['street_number'],
                'street_complement' => $data['street_complement'] ?? null,
                'street_neighborhood' => $data['street_neighborhood'],
                'street_city' => $data['street_city'],
                'street_state' => strtoupper($data['street_state']),
                'address' => $this->buildFullAddress($data),
                'tax' => 0,
                'subscription_type' => 'commission',
                'admin_commission_type' => 'percent',
                'admin_commission_amount' => 10,
                'delivery_self_system' => true,
                'delivery_take_away' => true,
                'order_minimum' => 0,
                'enable_saling' => 1,
                'status' => 0,
                'supplier_status' => 'pending',
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ]);

            return [$user, $store];
        });

        /** @var array{0: User, 1: Store} $result */
        [$user, $store] = $result;

        return redirect()
            ->route('fornecedor.cadastro.analisando')
            ->with([
                'supplier_name' => $store->name,
                'supplier_email' => $user->email,
            ]);
    }

    public function analysing(): View
    {
        return view('fornecedor.cadastro.analisando', [
            'supplierName' => session('supplier_name'),
            'supplierEmail' => session('supplier_email'),
        ]);
    }

    private function storeTypes(): array
    {
        return [
            ['value' => StoreType::GROCERY->value, 'label' => 'Limpeza, cozinha e utilidades'],
            ['value' => StoreType::MAKEUP->value, 'label' => 'Produto de cabelo e beleza'],
            ['value' => StoreType::FURNITURE->value, 'label' => 'Moveis de madeira macica'],
        ];
    }

    private function uniqueStoreSlug(string $name): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $suffix = 2;

        while (Store::query()->where('slug', $slug)->exists()) {
            $slug = $base . '-' . $suffix++;
        }

        return $slug;
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
