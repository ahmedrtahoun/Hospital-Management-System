import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddleware.js"
import Appointment from "../models/appointmentModel.js"
import User from "../models/userModel.js"
import pool from "../database/dbConnection.js"

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        aadhar,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        address
    } = req.body

    if (!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !aadhar ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address) {
        return next(new ErrorHandler("Please Fill Full Form!", 400))
    }

    // Find doctor by name and department
    const query = 'SELECT * FROM users WHERE first_name = $1 AND last_name = $2 AND role = $3 AND doctor_department = $4';
    const values = [doctor_firstName, doctor_lastName, 'Doctor', department];
    const doctorResult = await pool.query(query, values);
    
    if (doctorResult.rows.length === 0) {
        return next(new ErrorHandler("Doctor not found!", 404));
    }

    if (doctorResult.rows.length > 1) {
        return next(new ErrorHandler("Multiple doctors found with same name! Please contact through email or phone.", 400));
    }

    const doctorId = doctorResult.rows[0].id;
    const patientId = req.user.id;

    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        aadhar,
        dob,
        gender,
        appointmentDate: appointment_date,
        department,
        doctorId,
        patientId,
        doctorFirstName: doctor_firstName,
        doctorLastName: doctor_lastName,
        address
    })
    res.status(200).json({
        success: true,
        message: "Appointment Sent Successfully!",
        appointment
    })

})


export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.getAll();
    res.status(200).json({
        success: true,
        appointments
    })
})


export const updateAppointmentStatus = catchAsyncErrors(async (req,res,next)=>{
    const {id} = req.params;
    const {status} = req.body;
 
       let appointment = await Appointment.findById(id)
    if(!appointment){
       return next(new ErrorHandler("Appointment not found!", 404)) 
    }
    appointment = await Appointment.updateStatus(id, status)
    res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
        appointment
    })
})


export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
       let appointment = await Appointment.findById(id)
       if(!appointment){
        return next(new ErrorHandler("Appointment not found!", 404)) 
     }

     await Appointment.deleteAppointment(id);
     res.status(200).json({
        success: true,
        message: "Appointment Deleted!",
    })
})