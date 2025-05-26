import express from "express"
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.route("/send").post(sendMessage);
router.route("/all").get(isAuthenticated, authorizeRoles("Admin"), getAllMessages);

export default router