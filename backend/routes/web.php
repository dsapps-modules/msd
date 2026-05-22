<?php

use App\Http\Controllers\Api\V1\Fornecedor\FornecedorProductManageController;
use App\Http\Controllers\Fornecedor\FornecedorDashboardController;
use App\Http\Controllers\Fornecedor\FornecedorAuthController;
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
    Route::get('login', [FornecedorAuthController::class, 'create'])->name('fornecedor.login.form');
    Route::post('login', [FornecedorAuthController::class, 'store'])->name('fornecedor.login.submit');
    Route::post('logout', [FornecedorAuthController::class, 'destroy'])->name('fornecedor.logout');
});

Route::middleware(['auth:web', 'ensure.fornecedor.access'])->prefix('fornecedor')->group(function () {
    Route::get('dashboard', [FornecedorDashboardController::class, 'dashboard'])->name('fornecedor.dashboard');

    Route::prefix('produtos')->group(function () {
    Route::get('importar', [FornecedorProductManageController::class, 'index'])->name('fornecedor.produtos.importar');
    Route::post('importar', [FornecedorProductManageController::class, 'validateImport'])->name('fornecedor.produtos.validar');
    Route::post('importar/confirmar', [FornecedorProductManageController::class, 'confirmImport'])->name('fornecedor.produtos.confirmar');
    Route::get('modelo', [FornecedorProductManageController::class, 'template'])->name('fornecedor.produtos.modelo');
    });
});
