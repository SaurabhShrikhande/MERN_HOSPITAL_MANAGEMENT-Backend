export const genrateToken = (user, message , statusCode, res) => {

    const token = user.genrateJsonWebToken();
    const cookieName = user.role === "admin" ? "adminToken" : "patientToken";
    res.status(statusCode).cookie(cookieName , token, {
        expires : new Date(Date.now() + process.env.COKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly : true   //?  
    })
    .json({
        Sucess : true,
        message,
        user,
        token
    })
}