import { User } from "../modals/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./errorMidlware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return next(new ErrorHandler("ADmin Not Authenticated!" , 400))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  //syntax need 2 values

    req.user = await User.findById(decoded.id);
    
    //authentication
    if(req.user.role !== "admin"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resorce!` , 403))
    }   
    //authentication end

    next();
})


export const isPatientAuthenticated  = catchAsyncErrors(async(req,res,next) => {
    const token = req.cookies.patientToken;
    if(!token) {
        return next(new ErrorHandler("patient Not Authenticated!" , 400))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  //syntax need 2 values

    req.user = await User.findById(decoded.id);
    
    //authentication
    if(req.user.role !== "patient"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resorce!` , 403))
    }   
    //authentication end

    next();
})