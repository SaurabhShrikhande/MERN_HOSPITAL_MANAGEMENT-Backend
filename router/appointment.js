import express from "express";
import { getAllappointment, postAppointment , updateAppointmentStatus , deleteAppointment} from "../controller/appointmentController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middleWare/auth.js";
const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall" , isAdminAuthenticated, getAllappointment);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);
export default router;