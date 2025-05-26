import pool from '../database/dbConnection.js';

class Message {
    static async create({ firstName, lastName, email, phone, message }) {
        const query = `
            INSERT INTO messages (first_name, last_name, email, phone, message)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
        
        const values = [firstName, lastName, email, phone, message];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async getAll() {
        const query = 'SELECT * FROM messages ORDER BY created_at DESC';
        const result = await pool.query(query);
        return result.rows;
    }

    static async findById(id) {
        const query = 'SELECT * FROM messages WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async deleteMessage(id) {
        const query = 'DELETE FROM messages WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM messages WHERE email = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [email]);
        return result.rows;
    }
}

export default Message; 