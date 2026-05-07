$ErrorActionPreference = 'Stop'

$files = @(
  'frontend/web/index.html',
  'frontend/build/web/index.html'
)

foreach ($file in $files) {
  $path = Resolve-Path $file
  $content = Get-Content $path -Raw

  $firebasePattern = @'
(?s)\s*<!-- Firebase SDK -->\s*<script src="https://www\.gstatic\.com/firebasejs/9\.22\.0/firebase-app\.js" type="module"></script>\s*<script src="https://www\.gstatic\.com/firebasejs/9\.22\.0/firebase-auth\.js" type="module"></script>\s*<script src="https://www\.gstatic\.com/firebasejs/9\.22\.0/firebase-firestore\.js" type="module"></script>\s*
'@
  $content = [regex]::Replace($content, $firebasePattern, "`r`n")

  $content = [regex]::Replace(
    $content,
    "(?s)\s*window\.addEventListener\('load', function\(ev\) \{\s*",
    ""
  )

  $content = [regex]::Replace(
    $content,
    "(?s)\s*\}\);\s*</script>",
    "</script>"
  )

  [System.IO.File]::WriteAllText($path, $content)
}

$bootstrapPath = Resolve-Path 'frontend/build/web/flutter_bootstrap.js'
$bootstrapContent = Get-Content $bootstrapPath -Raw
$bootstrapPattern = @'
(?s)_flutter\.loader\.load\(\{\s*serviceWorkerSettings:\s*\{\s*serviceWorkerVersion:\s*"651221345"[^}]*\}\s*\}\);
'@
$bootstrapContent = [regex]::Replace(
  $bootstrapContent,
  $bootstrapPattern,
  '// Loading is handled by frontend/build/web/index.html so the splash can be removed there.'
)
[System.IO.File]::WriteAllText($bootstrapPath, $bootstrapContent)
