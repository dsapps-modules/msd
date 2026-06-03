<?php

use App\Http\Controllers\Api\V1\Fornecedor\FornecedorProductManageController;
use App\Http\Controllers\Fornecedor\FornecedorDashboardController;
use App\Http\Controllers\Fornecedor\FornecedorCadastroController;
use App\Http\Controllers\Fornecedor\FornecedorProductController;
use App\Http\Controllers\Fornecedor\FornecedorAuthController;
use App\Http\Controllers\Divulgador\DivulgadorCadastroController;
use App\Http\Controllers\Divulgador\DivulgadorAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/previewCatalog/{path?}', function (string $path = '') {
    $previewRoot = dirname(base_path()) . DIRECTORY_SEPARATOR . 'frontend' . DIRECTORY_SEPARATOR . 'build' . DIRECTORY_SEPARATOR . 'web';
    $indexPath = $previewRoot . DIRECTORY_SEPARATOR . 'index.html';
    $rootReal = realpath($previewRoot);
    $requestedPath = ltrim($path, '/');

    if ($requestedPath !== '') {
        $candidate = realpath($previewRoot . DIRECTORY_SEPARATOR . $requestedPath);

        if (
            $candidate !== false &&
            $rootReal !== false &&
            str_starts_with($candidate, $rootReal) &&
            is_file($candidate)
        ) {
            return response()->file($candidate, [
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
            ]);
        }
    }

    $html = file_get_contents($indexPath);
    if ($html === false) {
        abort(500, 'Preview catalog unavailable.');
    }

    $html = str_replace(
        '<base href="/">',
        '<base href="/previewCatalog/">',
        $html
    );

    return response($html, 200, [
        'Content-Type' => 'text/html; charset=utf-8',
        'Cache-Control' => 'no-cache, no-store, must-revalidate',
    ]);
})->where('path', '.*');

Route::get('/login', function () {
    return redirect()->route('fornecedor.login.form');
})->name('login');

Route::prefix('fornecedor')->group(function () {
    Route::get('cadastro', [FornecedorCadastroController::class, 'create'])->name('fornecedor.cadastro.create');
    Route::post('cadastro', [FornecedorCadastroController::class, 'store'])->name('fornecedor.cadastro.store');
    Route::get('cadastro/analisando', [FornecedorCadastroController::class, 'analysing'])->name('fornecedor.cadastro.analisando');
    Route::get('login', [FornecedorAuthController::class, 'create'])->name('fornecedor.login.form');
    Route::post('login', [FornecedorAuthController::class, 'store'])->name('fornecedor.login.submit');
    Route::post('logout', [FornecedorAuthController::class, 'destroy'])->name('fornecedor.logout');
});

Route::middleware(['auth:web', 'ensure.fornecedor.access'])->prefix('fornecedor')->group(function () {
    Route::get('dashboard', [FornecedorDashboardController::class, 'dashboard'])->name('fornecedor.dashboard');

    Route::prefix('produtos')->group(function () {
        Route::get('/', [FornecedorProductController::class, 'index'])->name('fornecedor.produtos.index');
        Route::get('create', [FornecedorProductController::class, 'create'])->name('fornecedor.produtos.create');
        Route::post('/', [FornecedorProductController::class, 'store'])->name('fornecedor.produtos.store');
        Route::get('{product}', [FornecedorProductController::class, 'show'])->whereNumber('product')->name('fornecedor.produtos.show');
        Route::get('{product}/edit', [FornecedorProductController::class, 'edit'])->whereNumber('product')->name('fornecedor.produtos.edit');
        Route::match(['put', 'patch'], '{product}', [FornecedorProductController::class, 'update'])->whereNumber('product')->name('fornecedor.produtos.update');
        Route::delete('{product}', [FornecedorProductController::class, 'destroy'])->whereNumber('product')->name('fornecedor.produtos.destroy');
        Route::get('importar', [FornecedorProductManageController::class, 'index'])->name('fornecedor.produtos.importar');
        Route::post('importar', [FornecedorProductManageController::class, 'validateImport'])->name('fornecedor.produtos.validar');
        Route::post('importar/confirmar', [FornecedorProductManageController::class, 'confirmImport'])->name('fornecedor.produtos.confirmar');
        Route::get('modelo', [FornecedorProductManageController::class, 'template'])->name('fornecedor.produtos.modelo');
    });
});

Route::prefix('divulgador')->group(function () {
    Route::get('/', function () {
        return redirect()->route('divulgador.login.form');
    });
    Route::get('cadastro', [DivulgadorCadastroController::class, 'create'])->name('divulgador.cadastro.create');
    Route::post('cadastro', [DivulgadorCadastroController::class, 'store'])->name('divulgador.cadastro.store');
    Route::get('cadastro/analisando', [DivulgadorAuthController::class, 'analysing'])->name('divulgador.cadastro.analisando');
    Route::get('login', [DivulgadorAuthController::class, 'create'])->name('divulgador.login.form');
    Route::post('login', [DivulgadorAuthController::class, 'store'])->name('divulgador.login.submit');
    Route::get('analisando', [DivulgadorAuthController::class, 'analysing'])->name('divulgador.analisando');
    Route::get('dashboard', [DivulgadorAuthController::class, 'dashboard'])->name('divulgador.dashboard');
    Route::post('logout', [DivulgadorAuthController::class, 'destroy'])->name('divulgador.logout');
});
