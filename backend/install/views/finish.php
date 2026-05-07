<?php
include __DIR__ . '/headerAsset.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Installation Complete</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="<?php echo $baseUrl; ?>/install/assets/css/style.css" rel="stylesheet">
</head>
<body>

<div class="steps">
    <a class="step completed">
        <span class="number">1</span>
        <span class="label">Get Started</span>
    </a>
    <a class="step completed">
        <span class="number">2</span>
        <span class="label">Server Requirements</span>
    </a>
    <a class="step completed">
        <span class="number">3</span>
        <span class="label">Set Permissions</span>
    </a>
    <a class="step completed">
        <span class="number">4</span>
        <span class="label">Connect Database</span>
    </a>
    <a class="step completed">
        <span class="number">5</span>
        <span class="label">Create Admin</span>
    </a>
    <a class="step completed">
        <span class="number">6</span>
        <span class="label">Finish Installation</span>
    </a>
</div>

<div class="card">
    <div class="success-message">
        <img src="<?php echo $baseUrl; ?>/install/assets/images/finish.svg" alt="finish">
        Installation Completed Successfully
    </div>

    <div class="options-container">
        <a href="<?= $frontendUrl ?>" target="_blank" class="option-item blue">
            <span class="option-name">Landing Page</span>
        </a>

        <a href="<?= $adminUrl ?>" target="_blank" class="option-item deep-blue">
            <span class="option-name">Admin Panel</span>
        </a>
    </div>
</div>
</body>
</html>