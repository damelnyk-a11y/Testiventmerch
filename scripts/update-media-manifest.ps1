$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$referencesRoot = Join-Path $repoRoot 'assets\images\references'
$manifestPath = Join-Path $referencesRoot 'manifest.json'
$dataPath = Join-Path $repoRoot 'assets\js\data.js'

$allowedExtensions = @('.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif')
$manifest = [ordered]@{}

if (-not (Test-Path -LiteralPath $referencesRoot)) {
    New-Item -ItemType Directory -Path $referencesRoot | Out-Null
}

# Create missing REF-XXX directories from ids declared in assets/js/data.js
$createdFolders = @()
if (Test-Path -LiteralPath $dataPath) {
    $dataContent = Get-Content -Path $dataPath -Raw
    $refIds = [regex]::Matches($dataContent, 'id\s*:\s*"(?<id>REF-\d{3})"') |
        ForEach-Object { $_.Groups['id'].Value } |
        Sort-Object -Unique

    foreach ($refId in $refIds) {
        $refFolderPath = Join-Path $referencesRoot $refId
        if (-not (Test-Path -LiteralPath $refFolderPath)) {
            New-Item -ItemType Directory -Path $refFolderPath | Out-Null
            $createdFolders += $refId
        }
    }
}

Get-ChildItem -Path $referencesRoot -Directory | Sort-Object Name | ForEach-Object {
    $refId = $_.Name

    $files = Get-ChildItem -Path $_.FullName -File |
        Where-Object { $allowedExtensions -contains $_.Extension.ToLower() } |
        Sort-Object @{Expression = { if ($_.BaseName -ieq 'cover') { 0 } else { 1 } }}, Name |
        Select-Object -ExpandProperty Name

    if ($files.Count -gt 0) {
        $manifest[$refId] = @($files)
    }
}

$manifest | ConvertTo-Json -Depth 5 | Set-Content -Path $manifestPath -Encoding UTF8
if ($createdFolders.Count -gt 0) {
    Write-Host "Created reference folders: $($createdFolders -join ', ')"
}
Write-Host "Updated media manifest: $manifestPath"
