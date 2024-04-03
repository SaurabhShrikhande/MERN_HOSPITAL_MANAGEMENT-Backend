import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : [3, "min length at least 3 character" ]
    },
    lastName : {
        type : String,
        required : true,
        minLength : [3, "min length at least 3 character" ]
    },
    email : {
        type : String,
        required : true,
        validate : [validator.isEmail , "please provide valid email" ]
    },
    phone : {
        type : String,
        required : true,
        minLength : [10, "min length at least 10 digit" ],
        maxLength : [12, "min length at least 10 digit" ]   
    },
    nic : {
        type : String,
        required : true,
        minLength : [13, " NIC min length at least 13 digit" ],
        maxLength : [13, " NIC min length at least 13 digit" ]   
    },
    dob : {
        type : Date,
        required : [true , "DOB is required"]
    },
    gender : {
        type : String,
        required : true,
        enum : ["male", "femail"],
    },
    appointment_date : {
        type : String,
        required : true,
    },
    department : {
        type : String,
        required : true,
    },
    doctor : {                //focus when insert new data
        firstName : {
            type : String,
            required : true,
        },
        lastName : {
            type : String,
            required : true,
        }  
    },
    hasVisited : {
        type : Boolean,
        default : false,
    },
    doctorId : {
        type : mongoose.Schema.ObjectId,
        required : true,
    },
    patientId : {
        type : mongoose.Schema.ObjectId,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    status : {
     type : String,
     enum : ["pending", "accepted" , "reject"],
     default : "pending"
    },
})


export const Appointment = mongoose.model("Appointment" , appointmentSchema)