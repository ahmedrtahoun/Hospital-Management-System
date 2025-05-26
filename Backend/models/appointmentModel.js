import pool from '../database/dbConnection.js';

class Appointment {
    static async create({
        firstName, lastName, email, phone, aadhar, dob,
        gender, appointmentDate, department, doctorId, patientId,
        doctorFirstName, doctorLastName, address
    }) {
        const query = `
            INSERT INTO appointments (
                first_name, last_name, email, phone, aadhar, dob,
                gender, appointment_date, department, doctor_id, patient_id,
                doctor_first_name, doctor_last_name, address, status
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING *`;
        
        const values = [
            firstName, lastName, email, phone, aadhar, dob,
            gender, appointmentDate, department, doctorId, patientId,
            doctorFirstName, doctorLastName, address, 'Pending'
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async findById(id) {
        const query = 'SELECT * FROM appointments WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async getAll() {
        const query = 'SELECT * FROM appointments ORDER BY appointment_date DESC';
        const result = await pool.query(query);
        return result.rows;
    }

    static async findByPatientId(patientId) {
        const query = 'SELECT * FROM appointments WHERE patient_id = $1 ORDER BY appointment_date DESC';
        const result = await pool.query(query, [patientId]);
        return result.rows;
    }

    static async findByDoctorId(doctorId) {
        const query = 'SELECT * FROM appointments WHERE doctor_id = $1 ORDER BY appointment_date DESC';
        const result = await pool.query(query, [doctorId]);
        return result.rows;
    }

    static async updateStatus(id, status) {
        const query = `
            UPDATE appointments 
            SET status = $1 
            WHERE id = $2 
            RETURNING *`;
        
        const result = await pool.query(query, [status, id]);
        return result.rows[0];
    }

    static async deleteAppointment(id) {
        const query = 'DELETE FROM appointments WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async findByDateAndDoctor(appointmentDate, doctorId) {
        const query = `
            SELECT * FROM appointments 
            WHERE appointment_date = $1 
            AND doctor_id = $2`;
        
        const result = await pool.query(query, [appointmentDate, doctorId]);
        return result.rows;
    }
}

export default Appointment; 