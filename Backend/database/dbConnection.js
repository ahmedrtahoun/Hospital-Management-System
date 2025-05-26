import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

export const dbConnection = async () => {
    try {
        // Test the connection
        await pool.query('SELECT NOW()');
        console.log('Connected to PostgreSQL Database');

        // Read and execute schema.sql
        try {
            console.log('Initializing database schema...');
            const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
            await pool.query(schemaSQL);
            console.log('Database schema initialized successfully');

            // Verify admin user exists
            const adminResult = await pool.query(
                "SELECT * FROM users WHERE email = 'admin@lifecare.com' AND role = 'Admin'"
            );

            if (adminResult.rows.length === 0) {
                console.log('Creating default admin user...');
                await pool.query(`
                    INSERT INTO users (
                        first_name, last_name, email, phone, aadhar, dob, gender, password, role
                    ) VALUES (
                        'Admin',
                        'User',
                        'admin@lifecare.com',
                        '1234567890',
                        '123456789012',
                        '1990-01-01',
                        'Others',
                        '$2a$10$p1YrW/6Oz61OhJqt/EsAkuGJ7LPGimZrEAm0zMPiLqWAolH1GPkZG',
                        'Admin'
                    )
                `);
                console.log('Default admin user created');
            } else {
                console.log('Admin user already exists');
            }
        } catch (schemaError) {
            console.error('Error initializing schema:', schemaError);
            throw schemaError;
        }
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default pool;