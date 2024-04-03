import express from "express";
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import { isAdminAuthenticated , isPatientAuthenticated } from "../middleWare/auth.js";

const router = express.Router();

router.post("/patient/register" , patientRegister)

router.post("/login" , login)

router.post("/admin/addnew" , isAdminAuthenticated,  addNewAdmin);  //only admin can add new admin

router.get("/doctors" , getAllDoctors)

router.get("/admin/me", isAdminAuthenticated , getUserDetails )
router.get("/patient/me" , isPatientAuthenticated , getUserDetails)

router.post("/admin/logout" , isAdminAuthenticated , logoutAdmin );
router.post("/patient/logout" , isPatientAuthenticated, logoutPatient )

router.post("/doctor/addnew" , isAdminAuthenticated , addNewDoctor)

export default router;