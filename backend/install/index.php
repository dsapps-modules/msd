<?php

// Disable Laravel autoload – installer must run BEFORE vendor exists
// This is a stand-alone PHP script

require_once __DIR__ . '/controllers/InstallController.php';

$installer = new InstallController();

// Determine the install step
$step = $_GET['step'] ?? 'welcome';

switch ($step) {
    case 'welcome':
        $installer->welcome();
        break;

    case 'requirements':
        $installer->requirements();
        break;

    case 'permissions':
        $installer->permissions();
        break;

    case 'environment':
        $installer->environment();
        break;

    case 'admin':
        $installer->admin();
        break;

    case 'finish':
        $installer->finish();
        break;

    default:
        $installer->welcome();
        break;
}
