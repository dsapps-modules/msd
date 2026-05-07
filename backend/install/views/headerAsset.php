<?php
// Get the base URL dynamically for subfolder support
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$uri = $_SERVER['REQUEST_URI'];
$base = $protocol . "://" . $host;

// Get the base path (handles subfolders like /test-backend/public)
$scriptPath = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
$basePath = rtrim(str_replace('/install', '', $scriptPath), '/');
$baseUrl = $base . $basePath;
?>

