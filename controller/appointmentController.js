import { catchAsyncErrors } from "../middleWare/catchAsyncError.js";
import ErrorHandler from "../middleWare/errorMidlware.js";
import { Appointment } from "../modals/appointmentSchema.js";
import { User } from "../modals/userSchema.js";



export const postAppointment = catchAsyncErrors(async(req,res,next) => {
    const {
 firstName ,
    lastName ,
    email ,
    phone ,
    nic ,
    dob ,
    gender ,
    appointment_date ,
    department ,          
    doctor_firstName,
    doctor_lastName ,
    hasVisited ,
    address ,
     }  = req.body

  console.log(req.body)
if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||          
    !doctor_firstName||
    !doctor_lastName ||
    !address 
){
  return next(new ErrorHandler("plese fill full form" , 404))
}
console.log("1");
//new
const isConflict =  await User.find({
    firstName : doctor_firstName,          //doctor nam , departmain must match with db doctors(doctor role) data
    lastName : doctor_lastName,
    role : "doctor",
    doctorDepartment : department
})
if(isConflict.length === 0){
    return next(new ErrorHandler("Doctor Not found!" , 400))
}
if(isConflict.length > 1){
    return next(new ErrorHandler("Doctor Conflict please contact througn Email or Phone!" , 400))
}

const doctorId = isConflict[0]._id;
const patientId = req.user._id;
const appointment = await Appointment.create({
    firstName ,
    lastName ,
    email ,
    phone ,
    nic ,
    dob ,
    gender ,
    appointment_date ,
    department ,   
    doctor : {        //need to focus
       firstName : doctor_firstName,
       lastName : doctor_lastName,
    } ,
    hasVisited ,
    address ,
    doctorId,
    patientId,

})

res.status(200).json({
    success : true,
    message : "appointment send Successfully",
    appointment
})

})


export const getAllappointment = catchAsyncErrors(async(req,res,next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success : true,
        message : "got all Message send Successfully",
        appointments,
    })
   })

   export const updateAppointmentStatus = catchAsyncErrors(async(req,res,next) => {
   const {id} = req.params
    let appointment = await Appointment.findById(id);
   if(!appointment){
    return next(new ErrorHandler("Appointment Not Found", 404))
   }
   
   appointment = await Appointment.findByIdAndUpdate(id, req.body , {   // { $set : {status : req.body.status }} try later
    new : true,          //?
    runValidators : true, //?
    useFindAndModify : false,  //?
    
   })

    res.status(200).json({
        success : true,
        message : " appointment status updated ",
        appointment,
    })
   })

   export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
      success: true,
      message: "Appointment Deleted!",
    });
  });



