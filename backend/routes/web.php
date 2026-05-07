<?php

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
