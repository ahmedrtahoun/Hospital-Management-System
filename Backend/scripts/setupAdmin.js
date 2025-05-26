import { config } from "dotenv";
import User from "../models/userModel.js";
import { dbConnection } from "../database/dbConnection.js";

// Load env vars
config({ path: "./config/config.env" });

const setupAdmin = async () => {
    try {
        // Connect to database
        await dbConnection();

        const adminData = {
            firstName: "Admin",
            lastName: "User",
            email: "admin@lifecare.com",
            phone: "1234567890",
            password: "admin123",
            gender: "Other",
            aadhar: "123456789012",
            dob: "1990-01-01",
            role: "Admin"
        };

        // Check if admin exists
        const existingAdmin = await User.findByEmail(adminData.email);
        
        if (existingAdmin) {
            console.log('\nAdmin user already exists:');
            console.log('Email:', existingAdmin.email);
            console.log('Role:', existingAdmin.role);
        } else {
            // Create admin user
            const admin = await User.create(adminData);
            console.log('\nNew admin user created:');
            console.log('Email:', admin.email);
            console.log('Password:', adminData.password);
            console.log('Role:', admin.role);
        }

        console.log('\nUse these credentials to login to the admin panel.\n');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

setupAdmin(); 