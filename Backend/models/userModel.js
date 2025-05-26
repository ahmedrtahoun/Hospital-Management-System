import pool from '../database/dbConnection.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class User {
    static async create({ firstName, lastName, email, phone, aadhar, dob, gender, password, role, doctorDepartment = null }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO users (
                first_name, last_name, email, phone, aadhar, dob, 
                gender, password, role, doctor_department
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`;
        
        const values = [
            firstName, lastName, email, phone, aadhar, dob,
            gender, hashedPassword, role, doctorDepartment
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }

    static async findById(id) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async getAllDoctors() {
        const query = 'SELECT * FROM users WHERE role = $1';
        const result = await pool.query(query, ['Doctor']);
        return result.rows;
    }

    static async getAllPatients() {
        const query = 'SELECT id, first_name, last_name, email, phone, aadhar, dob, gender, role FROM users WHERE role = $1';
        const result = await pool.query(query, ['Patient']);
        return result.rows;
    }

    static async updateProfile(id, updates) {
        const allowedUpdates = ['first_name', 'last_name', 'email', 'phone', 'aadhar', 'dob', 'gender', 'doctor_department'];
        const updateFields = [];
        const values = [];
        let paramCount = 1;

        Object.keys(updates).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updateFields.push(`${key} = $${paramCount}`);
                values.push(updates[key]);
                paramCount++;
            }
        });

        if (updateFields.length === 0) return null;

        values.push(id);
        const query = `
            UPDATE users 
            SET ${updateFields.join(', ')}
            WHERE id = $${paramCount}
            RETURNING *`;

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async deleteUser(id) {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static generateToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES
        });
    }
}

export default User; 