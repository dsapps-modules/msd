<?php

$publicRoot = __DIR__ . '/../build/web';
$requestedPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$normalizedPath = ltrim($requestedPath, '/');
$candidate = realpath($publicRoot . '/' . $normalizedPath);
$publicRootReal = realpath($publicRoot);

if (
    $normalizedPath !== '' &&
    $candidate !== false &&
    $publicRootReal !== false &&
    str_starts_with($candidate, $publicRootReal) &&
    is_file($candidate)
) {
    return false;
}

readfile($publicRoot . '/index.html');
