import { catchAsyncErrors } from "../middleWare/catchAsyncError.js";
import ErrorHandler from "../middleWare/errorMidlware.js";
import { User } from "../modals/userSchema.js"
import { genrateToken } from "../utils/jwttoken.js";
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async(req,res,next) => {
    const {firstName , lastName , email, phone, password , gender , dob , nic , role } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler("please fill full form " , 400));
    }

    let user = await User.findOne({email});
    if (user){
        return next(new ErrorHandler("user email alredy exist" , 400))
    }

     user = await User.create(req.body)   // {firstName , lastName , email, phone, passwword , gender , dob , nic , role }

      genrateToken(user , "user Register!", 200, res)
    //  res.status(200).json({
    //     sucess : true,
    //     message : "user Register!"
    //  })
})


export const login = catchAsyncErrors(async(req,res,next) => {
    const {email , password , confirmpassword , role} = req.body;
    if(!email || !password || !confirmpassword || !role){
           return next (new ErrorHandler("please provide all detail" , 400))
    }
    if(password !== confirmpassword){
        return next (new ErrorHandler("password & confirm password not matched" , 400))
    }

    const user = await User.findOne({email}).select("+password")     //new .select("+password") meaning we can select this field which field have select value false

    if(!user){
        return next (new ErrorHandler("Invalid  Email or Password" , 400))
    }                            //invalid email
                                        
    const isPasswordMatched = await user.comparePassword(password);    //User.comparePassword not function 
    if(!isPasswordMatched){
        return next (new ErrorHandler("Invalid Password or Email" , 400))
    }

    if(role !== user.role){
        return next (new ErrorHandler("User with this role not found" , 400))
    }
   
    genrateToken(user , "user logged in sussessfully!", 200, res)
    // res.status(200).json({
    //     sucess : true,
    //     message : "user logged in sussessfully"
    // })
})

export const addNewAdmin = catchAsyncErrors(async(req,res,next) => { 

    //same as user registration 
    const {firstName , lastName , email, phone, password , gender , dob , nic} = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
        return next(new ErrorHandler("please fill full form " , 400));
    }

    let isRegistered = await User.findOne({email});
    if (isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} role with this email alredy exist` , 400))
    }

    const admin = await User.create({firstName , lastName , email, phone, password , gender , dob , nic, role: "admin" }); //{firstName , lastName , email, phone, password , gender , dob , nic}
     
   res.status(200).json({
    sucess : true,
    message : "New Admin Register"

   })
})



export const getAllDoctors = catchAsyncErrors(async(req,res,next) => {
    console.log("get all doctor API")
    const doctors = await User.find({role : "doctor"})
    
    res.status(200).json({
        success : true,
        doctors,
    })
})

export const getUserDetails = catchAsyncErrors(async(req,res,next) =>{
    const user = req.user;
    res.status(200).json({
        sucess : true,
        user,
    })
})


export const logoutAdmin = catchAsyncErrors(async(req,res,next) => {
    res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});


export const logoutPatient = catchAsyncErrors(async(req,res,next) => {
    res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully.",
    });
});

export const addNewDoctor = catchAsyncErrors(async(req,res,next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avtar Required!" , 400))
    } 

    const {docAvatar } = req.files;

    const allowedFormats = ["image/png", "image/jpeg" ,"image/webp" ]
    
    if(!allowedFormats.includes(docAvatar.mimetype)){   //new .mimetype use to check format
        return next(new ErrorHandler("file format not supported" , 400))
    }

    const {firstName , lastName , email, phone, password , gender , dob , nic , doctorDepartment } = req.body;
     // console.log(req.body)

    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment){
        return next(new ErrorHandler("please provide full details" , 400))  
    }
   
    const isRegistered = await User.findOne({email});
    console.log(isRegistered);
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} alredy registered with this email!` , 400))  
    }
         // console.log("role1")
    //img post on clodinarry 
    // 1. import clodinary        //syntax //Uploader
    const cloudinaryResponse  = await cloudinary.uploader.upload(docAvatar.tempFilePath)  //path not path
    //console.log("role2")
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "clodinary Error",
            cloudinaryResponse.error || "unknown clodinary Error"
        );
    }

  
    const doctor = await User.create({firstName , lastName , email, phone, password , gender , dob , nic , doctorDepartment , 
        role:"doctor", 
    docAvatar: {
        public_id : cloudinaryResponse.public_id,   //console
        url : cloudinaryResponse.secure_url         //console
    } 
 })

 // console.log(doctor)

 res.status(200).json({
    success : true,
    message : "New Doctor Register!",
    doctor
 })
})

