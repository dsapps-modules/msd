<?php
include __DIR__ . '/headerAsset.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Installation - Database Setup</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
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
    <a class="step active">
        <span class="number">5</span>
        <span class="label">Create Admin</span>
    </a>
    <a class="step">
        <span class="number">6</span>
        <span class="label">Finish Installation</span>
    </a>
</div>

    <div class="card">
        <h2 class="card-title">Create Admin</h2>
        <form class="form" method="POST" action="?step=admin">
            <div class="form-row">
                <div class="form-group">
                    <label for="first_name">First Name</label>
                    <input type="text" id="first_name" name="first_name" placeholder="Enter Your First Name" required>
                </div>
                <div class="form-group">
                    <label for="last_name">Last Name</label>
                    <input type="text" id="last_name" name="last_name" placeholder="Enter Your Last Name">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="text" id="phone" name="phone" placeholder="Enter Your Phone Number">
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" placeholder="Enter Your Email" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="password">Password</label>

                    <div class="input-wrapper">
                        <input type="password" id="password" name="password" placeholder="Password" min="8" max="12" required>
                        <span class="toggle-password-icon" onclick="togglePassword(this)">
                            <i class="fa-solid fa-eye-slash"></i>
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="confirm_password">Confirm Password</label>
                    <div class="input-wrapper">
                        <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password">
                        <span class="toggle-password-icon" onclick="togglePassword(this)">
                            <i class="fa-solid fa-eye-slash"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div class="button-container">
                <p>Please fill up the correct admin details.</p>
                <button type="submit"  id="createAdminBtn" class="button">
                    Create Admin
                </button>
            </div>
        </form>
    </div>
    <script>
        function togglePassword(icon) {
            const input = icon.previousElementSibling;
            const isPassword = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPassword ? 'text' : 'password');

            const iconElement = icon.querySelector('i');
            iconElement.classList.toggle('fa-eye');
            iconElement.classList.toggle('fa-eye-slash');
        }

        // show spinner and button disable
        document.querySelector('.form').addEventListener('submit', function (e) {
            const btn = document.getElementById('createAdminBtn');
            btn.disabled = true; // disable button
            btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Creating...`;
        });
    </script>
</body>

</html>