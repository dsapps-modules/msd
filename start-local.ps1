param(
    [switch]$StartFrontendFlutter,
    [switch]$VisibleProcesses
)

$ErrorActionPreference = "Stop"

if (-not $PSBoundParameters.ContainsKey("VisibleProcesses")) {
    $VisibleProcesses = $true
}

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $projectRoot "backend"
$adminPath = Join-Path $projectRoot "admin"
$adminDeployPath = Join-Path $adminPath "deploy"
$frontendPath = Join-Path $projectRoot "frontend"
$puroPath = "C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\pingbird.Puro_Microsoft.Winget.Source_8wekyb3d8bbwe\puro.exe"
$phpPath = "C:\xampp82\php\php.exe"
$mysqlBat = "C:\xampp82\mysql_start.bat"
$nodePath = "C:\Program Files\nodejs\node.exe"
$powershellPath = "C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe"

function Test-HttpOk {
    param(
        [string]$Uri
    )

    try {
        return (Invoke-WebRequest -Uri $Uri -UseBasicParsing -TimeoutSec 3).StatusCode -eq 200
    } catch {
        return $false
    }
}

function Start-IfNotRunning {
    param(
        [string]$Name,
        [scriptblock]$Check,
        [scriptblock]$Start,
        [int]$WaitSeconds = 45
    )

    if (& $Check) {
        Write-Host "$Name ja esta em execucao."
        return
    }

    & $Start

    $deadline = (Get-Date).AddSeconds($WaitSeconds)
    while ((Get-Date) -lt $deadline) {
        Start-Sleep -Seconds 2
        if (& $Check) {
            Write-Host "$Name iniciado."
            return
        }
    }

    throw "$Name nao respondeu dentro de $WaitSeconds segundos."
}

Start-IfNotRunning -Name "MySQL" `
    -Check { Get-Process mysqld -ErrorAction SilentlyContinue } `
    -Start {
        $mysqlCommand = "cd /d C:\xampp82 && mysql_start.bat"
        $processParams = @{
            FilePath = "cmd.exe"
            ArgumentList = @("/k", $mysqlCommand)
        }
        if (-not $VisibleProcesses) {
            $processParams.WindowStyle = "Hidden"
        }
        Start-Process @processParams | Out-Null
    } `
    -WaitSeconds 20

Start-IfNotRunning -Name "Backend API" `
    -Check { Test-HttpOk "http://127.0.0.1:8000/api/v1/site-general-info" } `
    -Start {
        $processParams = @{
            FilePath = "cmd.exe"
            ArgumentList = @(
                "/k",
                "cd /d `"$backendPath`" && `"$phpPath`" artisan serve --host=127.0.0.1 --port=8000"
            )
        }
        if (-not $VisibleProcesses) {
            $processParams.WindowStyle = "Hidden"
        }
        Start-Process @processParams | Out-Null
    }

Start-IfNotRunning -Name "Admin Panel" `
    -Check { Test-HttpOk "http://127.0.0.1:3000/pt-BR/admin/signin" } `
    -Start {
        $processParams = @{
            FilePath = "cmd.exe"
            ArgumentList = @(
                "/k",
                "cd /d `"$adminDeployPath`" && `"$nodePath`" server.js"
            )
        }
        if (-not $VisibleProcesses) {
            $processParams.WindowStyle = "Hidden"
        }
        Start-Process @processParams | Out-Null
    }

if ($StartFrontendFlutter) {
    if (Test-Path $puroPath) {
        try {
            Start-IfNotRunning -Name "Frontend Flutter" `
                -Check { Test-HttpOk "http://127.0.0.1:3001" } `
                -Start {
                    $packageConfig = Join-Path $frontendPath ".dart_tool\package_config.json"
                    if (-not (Test-Path $packageConfig)) {
                        & $puroPath -e stable flutter pub get
                        if ($LASTEXITCODE -ne 0) {
                            throw "flutter pub get failed."
                        }
                    }

                    $processParams = @{
                        FilePath = "cmd.exe"
                        ArgumentList = @(
                            "/k",
                            "cd /d `"$frontendPath`" && `"$puroPath`" -e stable flutter run -d chrome --web-hostname 127.0.0.1 --web-port 3001 --dart-define=APP_BASE_URL=http://127.0.0.1:8000"
                        )
                    }
                    if (-not $VisibleProcesses) {
                        $processParams.WindowStyle = "Hidden"
                    }
                    Start-Process @processParams | Out-Null
                }
        } catch {
            Write-Host "Frontend Flutter nao iniciado: $($_.Exception.Message)"
        }
    } else {
        Write-Host "Puro/Flutter nao encontrado neste ambiente."
    }
} else {
    Write-Host "Frontend Flutter pulado. Use -StartFrontendFlutter para tentar inicia-lo."
}

Write-Host ""
Write-Host "URLs disponiveis:"
Write-Host "Admin   : http://127.0.0.1:3000/pt-BR/admin/signin"
Write-Host "Seller  : http://127.0.0.1:3000/pt-BR/seller/signin"
Write-Host "API     : http://127.0.0.1:8000/api/v1/site-general-info"
Write-Host "Frontend: http://127.0.0.1:3001"
Write-Host ""
Write-Host "Credenciais de demonstracao:"
Write-Host "admin@gmail.com / 12345678"
Write-Host "seller@gmail.com / 12345678"
Write-Host "customer@gmail.com / 12345678"
Write-Host "deliveryman@gmail.com / 12345678"
Write-Host ""
