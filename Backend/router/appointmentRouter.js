import express from "express"
import {
    postAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment,
} from "../controller/appointmentController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

// Patient routes
router.route("/create").post(isAuthenticated, postAppointment);

// Admin routes
router.route("/getall").get(isAuthenticated, authorizeRoles("Admin"), getAllAppointments);
router.route("/update/:id").put(isAuthenticated, authorizeRoles("Admin"), updateAppointmentStatus);
router.route("/delete/:id").delete(isAuthenticated, authorizeRoles("Admin"), deleteAppointment);

export default router;
