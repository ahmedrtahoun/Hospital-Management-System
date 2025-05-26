import express from "express"
import {
    addNewAdmin,
    addNewDoctor,
    getAllDoctors,
    getAllPatients,
    getUserDetails,
    login,
    logout,
    patientRegister
} from "../controller/userController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.route("/patient/register").post(patientRegister);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/admin/me").get(isAuthenticated, authorizeRoles("Admin"), getUserDetails);

// Admin only routes
router.route("/admin/add").post(isAuthenticated, authorizeRoles("Admin"), addNewAdmin);
router.route("/admin/add-doctor").post(isAuthenticated, authorizeRoles("Admin"), addNewDoctor);
router.route("/doctors").get(isAuthenticated, getAllDoctors);
router.route("/admin/patients").get(isAuthenticated, authorizeRoles("Admin"), getAllPatients);

export default router;
