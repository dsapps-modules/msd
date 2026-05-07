<?php
include __DIR__ . '/headerAsset.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>System Installation</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="<?php echo $baseUrl; ?>/install/assets/css/style.css" rel="stylesheet">
</head>
<body>

<div class="steps">
    <a class="step active">
        <span class="number">1</span>
        <span class="label">Get Started</span>
    </a>
    <a class="step">
        <span class="number">2</span>
        <span class="label">Server Requirements</span>
    </a>
    <a class="step">
        <span class="number">3</span>
        <span class="label">Set Permissions</span>
    </a>
    <a class="step">
        <span class="number">4</span>
        <span class="label">Connect Database</span>
    </a>
    <a class="step">
        <span class="number">5</span>
        <span class="label">Create Admin</span>
    </a>
    <a class="step">
        <span class="number">6</span>
        <span class="label">Finish Installation</span>
    </a>
</div>



<div class="container">
    <div class="left">
        <h2 class="card-title">Get Started</h2>
        <p>Ensure the following information is ready before installation. It’s required to complete the process.</p>
        <div class="info-boxes">
            <div class="info-box">
                <img class="icon" src="<?php echo $baseUrl; ?>/install/assets/images/database.svg"
                     alt="Install Illustration">
                <div class="label">Database Name</div>
            </div>
            <div class="info-box">
                <img class="icon" src="<?php echo $baseUrl; ?>/install/assets/images/database_user_name.svg"
                     alt="Install Illustration">
                <div class="label">Database Username</div>
            </div>
            <div class="info-box">
                <img class="icon" src="<?php echo $baseUrl; ?>/install/assets/images/database_host_name.svg"
                     alt="Install Illustration">
                <div class="label">Database Host Name</div>
            </div>
            <div class="info-box">
                <img class="icon" src="<?php echo $baseUrl; ?>/install/assets/images/database_password.svg"
                     alt="Install Illustration">
                <div class="label">Database Password</div>
            </div>
        </div>
    </div>
    <div class="right">
        <div class="cta">
            <p>Ready to begin the installation?</p>
            <a class="button" href="?step=requirements">Get Started</a>
        </div>
    </div>
</div>

</body>
</html>




