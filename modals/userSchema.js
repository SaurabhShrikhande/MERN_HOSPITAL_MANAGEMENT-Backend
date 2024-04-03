import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import { config } from "dotenv";
// config({path : "./config/config.env"})

const userSchema = new mongoose.Schema({
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
    password : {
        type : String,
        minLength : [8, "password must contain at least 8 character"],
        required : true,
        select : false,    //when u get user, u get all value except password
    },
    role : {
        type : String,
        required : true,
        enum : ["admin", "patient" , "doctor"]  //didnt work on doctor, no page form in project 
    },
    doctorDepartment : {
        type : String,
    },
    docAvatar : {
        public_id : String,
        url : String,
    }
})

/*
userSchema.pre("save" , function () {
    const salt = bcrypt.genSaltSync(10);
   // console.log(salt)
    const hash = bcrypt.hashSync( this.password , salt);
  //  console.log(hash)
    this.password = hash;
})
*/ 

userSchema.pre("save" , async function (next) {
    if (!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//for compare pass
userSchema.methods.comparePassword = async function (enterdPassword){
    return await bcrypt.compare(enterdPassword , this.password);
}

userSchema.methods.genrateJsonWebToken = function (){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET_KEY, {     //we are saving here id,used in decode
        expiresIn : process.env.JWT_EXPIRES,
    })
}


export const User = mongoose.model("user" , userSchema)