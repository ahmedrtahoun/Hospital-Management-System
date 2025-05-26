import app from "./app.js";
import cloudinary from "cloudinary";
import os from 'os';
import dns from 'dns';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

// Get network interfaces
const getNetworkAddresses = () => {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (const iface of Object.values(interfaces)) {
        for (const addr of iface) {
            if (addr.family === 'IPv4') {
                addresses.push({
                    address: addr.address,
                    internal: addr.internal
                });
            }
        }
    }
    
    return addresses;
};

// Start server with error handling
try {
    const server = app.listen(PORT, HOST, () => {
        const addresses = getNetworkAddresses();
        
        console.log('\n=== Server Details ===');
        console.log(`Environment: ${process.env.NODE_ENV}`);
        console.log(`Host: ${HOST}`);
        console.log(`Port: ${PORT}`);
        
        console.log('\nServer is accessible at:');
        console.log(`- Local: http://localhost:${PORT}`);
        console.log(`- Loopback: http://127.0.0.1:${PORT}`);
        
        console.log('\nAll network interfaces:');
        addresses.forEach(({address, internal}) => {
            console.log(`- http://${address}:${PORT} (${internal ? 'internal' : 'external'})`);
        });
        
        // Get hostname
        dns.lookup(os.hostname(), (err, ip, family) => {
            if (!err) {
                console.log(`\nHostname address:`);
                console.log(`- http://${ip}:${PORT}`);
            }
        });
        
        console.log('\nTroubleshooting tips:');
        console.log('1. From WSL, test with: curl http://localhost:4000');
        console.log('2. From Windows:');
        console.log('   a. Run Backend/scripts/setup-wsl-port.ps1 as Administrator');
        console.log('   b. Try all the URLs shown above');
        console.log('   c. Check Windows Defender Firewall settings');
        console.log('3. If nothing works:');
        console.log('   a. Stop the server (Ctrl+C)');
        console.log('   b. Close all terminal windows');
        console.log('   c. Restart WSL: wsl --shutdown');
        console.log('   d. Start a new terminal and try again\n');
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`\nError: Port ${PORT} is already in use`);
            console.log('Please try the following:');
            console.log(`1. Check if another process is using port ${PORT}:`);
            console.log(`   netstat -ano | findstr :${PORT}`);
            console.log('2. Stop the other process or use a different port');
            console.log('3. Wait a few seconds and try again\n');
        } else {
            console.error('Server error:', error);
        }
        process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
        console.log(`Error: ${err.message}`);
        console.log('Shutting down the server due to Unhandled Promise rejection');
        server.close(() => {
            process.exit(1);
        });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
        console.log(`Error: ${err.message}`);
        console.log('Shutting down the server due to Uncaught Exception');
        process.exit(1);
    });

} catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
}