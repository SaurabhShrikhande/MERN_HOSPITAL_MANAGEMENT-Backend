import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message : {
        type : String,
        required : true,
        minLength : [3, "min length at least 3 character" ]
    },
})

export const Message = mongoose.model("message" , messageSchema)