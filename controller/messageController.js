import { Message } from "../modals/messageShema.js";
import { catchAsyncErrors } from "../middleWare/catchAsyncError.js"
import ErrorHandler from "../middleWare/errorMidlware.js"

export const sendMessage = catchAsyncErrors( async (req, res , next) => {  //insted of  catchAsyncErrors use try catch block

    const { firstName, lastName , email , phone, message  } =  req.body;

    if (!firstName || !lastName || !email || !phone || !message ){
        // return res.status(400).json({
        //     success : false,
        //     message : "please fill full form"
        // })

        return next(new ErrorHandler("please fill the form", 400)) 


    }
        await Message.create({firstName, lastName , email , phone, message})
      //  await Message.create(res.body)
        
        res.status(200).json({
            success : true,
            message : "Message send Successfully"
        })
   
})


export const getAllMessages = catchAsyncErrors(async(req,res,next) => {
    const messages = await Message.find();
    res.status(200).json({
        success : true,
        message : "got all Message send Successfully",
        messages
    })
   })