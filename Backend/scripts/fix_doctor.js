import { config } from "dotenv";
import pool from "../database/dbConnection.js";

// Load env vars
config({ path: "./config/config.env" });

const fixDoctor = async () => {
    try {
        // First, let's find the doctor by email
        const findQuery = 'SELECT * FROM users WHERE email = $1';
        const findResult = await pool.query(findQuery, ['moamhed@example.com']);
        
        if (findResult.rows.length === 0) {
            console.log('Doctor not found. Adding new record...');
            // Add the doctor with correct information
            const addQuery = `
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
                    'Mohamed',
                    'Ahmed',
                    'moamhed@example.com',
                    '01551667678',
                    '1234567891',
                    '1980-09-24',
                    'Male',
                    '$2a$10$p1YrW/6Oz61OhJqt/EsAkuGJ7LPGimZrEAm0zMPiLqWAolH1GPkZG',
                    'Doctor',
                    'Cardiology'
                )`;
            await pool.query(addQuery);
            console.log('Doctor added successfully!');
        } else {
            console.log('Doctor found. Updating record...');
            // Update the existing record
            const updateQuery = `
                UPDATE users 
                SET 
                    first_name = 'Mohamed',
                    last_name = 'Ahmed',
                    doctor_department = 'Cardiology'
                WHERE email = 'moamhed@example.com'`;
            await pool.query(updateQuery);
            console.log('Doctor updated successfully!');
        }
        process.exit(0);
    } catch (error) {
        console.error('Error fixing doctor:', error);
        process.exit(1);
    }
};

fixDoctor(); 