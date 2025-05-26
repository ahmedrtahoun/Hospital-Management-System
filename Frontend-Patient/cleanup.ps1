# Ensure we're running as Administrator
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
$isAdmin = $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "This script needs to be run as Administrator. Please run PowerShell as Administrator and try again."
    exit 1
}

Write-Host "Cleaning up node_modules..."

# Remove read-only attributes recursively
attrib -r ".\node_modules\*.*" /s

# Force remove problematic files
if (Test-Path ".\node_modules\@esbuild\win32-x64\esbuild.exe") {
    Remove-Item ".\node_modules\@esbuild\win32-x64\esbuild.exe" -Force
}

if (Test-Path ".\node_modules\@rollup\rollup-win32-x64-msvc\rollup.win32-x64-msvc.node") {
    Remove-Item ".\node_modules\@rollup\rollup-win32-x64-msvc\rollup.win32-x64-msvc.node" -Force
}

# Remove node_modules directory
if (Test-Path ".\node_modules") {
    Remove-Item ".\node_modules" -Recurse -Force
}

# Remove package-lock.json
if (Test-Path ".\package-lock.json") {
    Remove-Item ".\package-lock.json" -Force
}

Write-Host "Cleanup completed!" 