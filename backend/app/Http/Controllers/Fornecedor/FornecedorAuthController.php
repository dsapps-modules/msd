<?php

namespace App\Http\Controllers\Fornecedor;

use App\Http\Controllers\Api\V1\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class FornecedorAuthController extends Controller
{
    public function create(): View|RedirectResponse
    {
        $user = Auth::guard('web')->user();

        if ($user && $user->isFornecedorAccount()) {
            return redirect()->route('fornecedor.produtos.importar');
        }

        return view('fornecedor.auth.login', [
            'importUrl' => route('fornecedor.produtos.importar'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8', 'max:32'],
            'remember' => ['nullable', 'boolean'],
        ]);

        $email = strtolower(trim((string) $credentials['email']));

        $user = User::query()
            ->whereRaw('LOWER(email) = ?', [$email])
            ->where('status', 1)
            ->first();

        if (
            !$user ||
            !$user->isFornecedorAccount() ||
            !Hash::check($credentials['password'], $user->password)
        ) {
            return back()
                ->withErrors([
                    'email' => 'Credenciais inválidas para acesso do fornecedor.',
                ])
                ->onlyInput('email');
        }

        Auth::guard('web')->login($user, (bool) ($credentials['remember'] ?? false));
        $request->session()->regenerate();

        return redirect()->intended(route('fornecedor.produtos.importar'));
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('fornecedor.login.form');
    }
}
