<?php

namespace App\Http\Controllers\Fornecedor;

use App\Http\Controllers\Api\V1\Controller;
use App\Http\Requests\FornecedorProductStoreRequest;
use App\Http\Requests\FornecedorProductUpdateRequest;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\View\View;

class FornecedorProductController extends Controller
{
    public function index(Request $request): View
    {
        $user = $request->user('web') ?? auth('web')->user();

        $products = Product::withoutGlobalScopes()
            ->where('account_id', $user->id)
            ->latest('id')
            ->get();

        return view('fornecedor.produtos.index', [
            'user' => $user,
            'products' => $products,
        ]);
    }

    public function create(Request $request): View
    {
        $user = $request->user('web') ?? auth('web')->user();

        return view('fornecedor.produtos.create', [
            'user' => $user,
            'product' => new Product([
                'codigo' => old('codigo'),
                'name' => old('name'),
                'description' => old('description'),
                'altura' => old('altura', 10),
                'largura' => old('largura', 20),
                'comprimento' => old('comprimento', 30),
                'peso' => old('peso', 0.85),
                'embalagem' => old('embalagem', 'Caixa'),
                'valor_venda' => old('valor_venda', 0),
                'estoque_reservado' => old('estoque_reservado', 0),
            ]),
        ]);
    }

    public function store(FornecedorProductStoreRequest $request): RedirectResponse
    {
        $user = $request->user('web') ?? auth('web')->user();
        $storeId = $this->resolveStoreId($user->id);

        Product::withoutGlobalScopes()->create([
            'store_id' => $storeId,
            'account_id' => $user->id,
            'codigo' => $request->string('codigo')->trim()->toString(),
            'name' => $request->string('name')->trim()->toString(),
            'description' => $request->input('description'),
            'altura' => $request->input('altura'),
            'largura' => $request->input('largura'),
            'comprimento' => $request->input('comprimento'),
            'peso' => $request->input('peso'),
            'embalagem' => $request->string('embalagem')->trim()->toString(),
            'valor_venda' => $request->input('valor_venda'),
            'estoque_reservado' => $request->input('estoque_reservado'),
            'slug' => Str::slug($request->input('codigo') . '-' . $request->input('name') . '-' . $user->id . '-' . Str::random(6)),
            'status' => 'pending',
        ]);

        return redirect()
            ->route('fornecedor.produtos.index')
            ->with('success', 'Produto cadastrado com sucesso.');
    }

    public function show(Request $request, Product $product): View
    {
        $user = $request->user('web') ?? auth('web')->user();
        $this->ensureOwnership($product, $user->id);

        return view('fornecedor.produtos.show', [
            'user' => $user,
            'product' => $product,
        ]);
    }

    public function edit(Request $request, Product $product): View
    {
        $user = $request->user('web') ?? auth('web')->user();
        $this->ensureOwnership($product, $user->id);

        return view('fornecedor.produtos.edit', [
            'user' => $user,
            'product' => $product,
        ]);
    }

    public function update(FornecedorProductUpdateRequest $request, Product $product): RedirectResponse
    {
        $user = $request->user('web') ?? auth('web')->user();
        $this->ensureOwnership($product, $user->id);

        $product->update([
            'codigo' => $request->string('codigo')->trim()->toString(),
            'name' => $request->string('name')->trim()->toString(),
            'description' => $request->input('description'),
            'altura' => $request->input('altura'),
            'largura' => $request->input('largura'),
            'comprimento' => $request->input('comprimento'),
            'peso' => $request->input('peso'),
            'embalagem' => $request->string('embalagem')->trim()->toString(),
            'valor_venda' => $request->input('valor_venda'),
            'estoque_reservado' => $request->input('estoque_reservado'),
        ]);

        return redirect()
            ->route('fornecedor.produtos.show', $product)
            ->with('success', 'Produto atualizado com sucesso.');
    }

    public function destroy(Request $request, Product $product): RedirectResponse
    {
        $user = $request->user('web') ?? auth('web')->user();
        $this->ensureOwnership($product, $user->id);

        $product->delete();

        return redirect()
            ->route('fornecedor.produtos.index')
            ->with('success', 'Produto excluído com sucesso.');
    }

    private function resolveStoreId(int $userId): int
    {
        $storeId = (int) Store::query()
            ->where('store_seller_id', $userId)
            ->orderBy('id')
            ->value('id');

        abort_unless($storeId > 0, 422, 'Fornecedor sem loja vinculada.');

        return $storeId;
    }

    private function ensureOwnership(Product $product, int $userId): void
    {
        abort_unless((int) $product->account_id === $userId, 404);
    }
}
