import { config } from "dotenv";
import pool from "../database/dbConnection.js";
import bcrypt from "bcryptjs";

// Load env vars
config({ path: "./config/config.env" });

const addDoctor = async () => {
    try {
        const hashedPassword = await bcrypt.hash("doctor123", 10);
        const query = `
            INSERT INTO users (
                first_name,
                last_name,
                email,
                phone,
                aadhar,
                dob,
                gender,
                password,
                role,
                doctor_department
            ) VALUES (
                'Sarah',
                'Johnson',
                'sarah.johnson@lifecare.com',
                '9876543210',
                '987654321012',
                '1985-06-15',
                'Female',
                $1,
                'Doctor',
                'Physical Therapy'
            )`;

        await pool.query(query, [hashedPassword]);
        console.log('Doctor added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error adding doctor:', error);
        process.exit(1);
    }
};

addDoctor(); 