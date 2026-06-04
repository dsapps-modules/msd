<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CartController
{
    private const SESSION_KEY = 'clean_cart';

    public function index(Request $request): View
    {
        $cart = $this->cartItems($request);
        $itemsCount = array_sum(array_map(static fn (array $item): int => (int) ($item['quantity'] ?? 0), $cart));
        $subtotal = array_sum(array_map(static fn (array $item): float => (float) ($item['price_value'] ?? 0) * (int) ($item['quantity'] ?? 0), $cart));
        $shipping = 0.0;
        $total = $subtotal + $shipping;

        return view('carrinho', compact('cart', 'itemsCount', 'subtotal', 'shipping', 'total'));
    }

    public function add(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => ['required', 'string'],
            'title' => ['required', 'string'],
            'subtitle' => ['nullable', 'string'],
            'category' => ['nullable', 'string'],
            'brand' => ['nullable', 'string'],
            'ref' => ['nullable', 'string'],
            'price' => ['required', 'string'],
            'old_price' => ['nullable', 'string'],
            'image' => ['nullable', 'string'],
            'stock' => ['nullable', 'string'],
            'quantity' => ['nullable', 'integer', 'min:1', 'max:99'],
            'redirect_to' => ['nullable', 'string'],
        ]);

        $cart = $this->cartItems($request);
        $slug = $validated['slug'];
        $quantity = (int) ($validated['quantity'] ?? 1);

        if (isset($cart[$slug])) {
            $cart[$slug]['quantity'] += $quantity;
        } else {
            $cart[$slug] = [
                'slug' => $slug,
                'title' => $validated['title'],
                'subtitle' => $validated['subtitle'] ?? '',
                'category' => $validated['category'] ?? 'Produto',
                'brand' => $validated['brand'] ?? 'Coopera',
                'ref' => $validated['ref'] ?? '',
                'price_label' => $validated['price'],
                'old_price_label' => $validated['old_price'] ?? '',
                'price_value' => $this->parsePrice($validated['price']),
                'image' => $validated['image'] ?? 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
                'stock' => $validated['stock'] ?? 'Em estoque',
                'quantity' => $quantity,
            ];
        }

        session()->put(self::SESSION_KEY, $cart);

        $redirectTo = $validated['redirect_to'] ?? route('carrinho.index');

        return redirect()->to($redirectTo)->with('success', 'Produto adicionado ao carrinho.');
    }

    public function update(Request $request, string $slug): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:99'],
        ]);

        $cart = $this->cartItems($request);

        if (isset($cart[$slug])) {
            $cart[$slug]['quantity'] = (int) $validated['quantity'];
            session()->put(self::SESSION_KEY, $cart);
        }

        return back()->with('success', 'Quantidade atualizada.');
    }

    public function remove(Request $request, string $slug): RedirectResponse
    {
        $cart = $this->cartItems($request);
        unset($cart[$slug]);
        session()->put(self::SESSION_KEY, $cart);

        return back()->with('success', 'Produto removido do carrinho.');
    }

    public function clear(Request $request): RedirectResponse
    {
        session()->forget(self::SESSION_KEY);

        return redirect()->route('carrinho.index')->with('success', 'Carrinho limpo.');
    }

    private function cartItems(Request $request): array
    {
        $items = $request->session()->get(self::SESSION_KEY, []);

        return is_array($items) ? $items : [];
    }

    private function parsePrice(string $value): float
    {
        $numeric = preg_replace('/[^\d,.-]/', '', $value) ?? '0';
        $numeric = str_replace('.', '', $numeric);
        $numeric = str_replace(',', '.', $numeric);

        return (float) $numeric;
    }
}
