class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "internal server error";
  err.statusCode = err.statusCode || 500;

  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message , 400);
  }

  if ( err.name  === 'JsonWebTokenError'){
    const message = `json web tocken is invalid`,
    err = new ErrorHandler(message , 400);
  }


  if(err.name === "TokenExpired"){
        const message = "json token Expired"
    err = new ErrorHandler(message , 400);
  }

  if(err.name === "CastError"){
    const message = `Invalid ${err.path}`
    err = new ErrorHandler(message , 400);
}
  
const errorMessage = err.errors ?  Object.values(err.errors).map(error => error.message).join(" "):err.message;  // modify error msg only

return res.status(err.statusCode).json({
    success : false,
    message :/* err.message */ errorMessage
})

}

export default ErrorHandler;