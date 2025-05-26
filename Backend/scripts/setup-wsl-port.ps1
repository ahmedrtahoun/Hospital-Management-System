# Ensure we're running as Administrator
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
$isAdmin = $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "This script needs to be run as Administrator. Please run PowerShell as Administrator and try again."
    exit 1
}

Write-Host "=== WSL Port Forwarding Setup ==="
Write-Host "Setting up port forwarding for Node.js server..."

# Get WSL IP Address
Write-Host "`nGetting WSL IP address..."
$wslAddress = bash.exe -c "ip addr show eth0 | grep 'inet ' | cut -d ' ' -f 6 | cut -d / -f 1"
$found = $wslAddress -match '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'

if (!$found) {
    Write-Host "Error: Could not find WSL IP address"
    exit 1
}

$remoteport = 4000
$addr = $matches[0]

Write-Host "WSL IP Address: $addr"
Write-Host "Port to forward: $remoteport"

# Remove any existing port forwarding rules
Write-Host "`nRemoving existing port forwarding rules..."
Invoke-Expression "netsh interface portproxy reset"

# Add new port forwarding rule
Write-Host "Adding new port forwarding rule..."
$command = "netsh interface portproxy add v4tov4 listenport=$remoteport connectport=$remoteport connectaddress=$addr"
Invoke-Expression $command

# Verify port forwarding rules
Write-Host "`nVerifying port forwarding rules:"
Invoke-Expression "netsh interface portproxy show v4tov4"

# Remove existing firewall rules for this port
Write-Host "`nRemoving existing firewall rules..."
Remove-NetFirewallRule -DisplayName "Node.js Server WSL" -ErrorAction SilentlyContinue

# Add new firewall rules
Write-Host "Adding new firewall rules..."
New-NetFirewallRule -DisplayName "Node.js Server WSL" -Direction Inbound -Protocol TCP -LocalPort $remoteport -Action Allow
New-NetFirewallRule -DisplayName "Node.js Server WSL" -Direction Outbound -Protocol TCP -LocalPort $remoteport -Action Allow

# Test the connection
Write-Host "`nTesting connection..."
$testResult = Test-NetConnection -ComputerName localhost -Port $remoteport -WarningAction SilentlyContinue

if ($testResult.TcpTestSucceeded) {
    Write-Host "Port forwarding setup successful!"
} else {
    Write-Host "Port forwarding setup completed, but connection test failed."
}

Write-Host "`n=== Setup Complete ==="
Write-Host "Try accessing the server at:"
Write-Host "- http://localhost:$remoteport"
Write-Host "- http://127.0.0.1:$remoteport"
Write-Host "- http://$addr:$remoteport"

Write-Host "`nIf you still can't connect, try:"
Write-Host "1. Restart your WSL terminal"
Write-Host "2. Restart the Node.js server"
Write-Host "3. Run 'netsh interface portproxy show v4tov4' to verify port forwarding"
Write-Host "4. Check if the server is running: curl http://localhost:4000 (from WSL)" 