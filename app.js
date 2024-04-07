import express from "express";
import { config } from "dotenv";
import cors from "cors"; 
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConection } from "./dataBase/dbConnection.js";  //.js imp otherwise throw err
import messageRouter from "./router/messageRouter.js"
import { errorMiddleware } from "./middleWare/errorMidlware.js";
import userRouter from "./router/userRouter.js"
import appointmentRouter from "./router/appointment.js"
const app = express();
config({path : "./config/config.env"})

// console.log(process.env);

// app.use(cors({
//      origin : [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
//      methods : ["GET" , "POST" , "PUT" , "DELETE"],
//      credentials : true,
// }))

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(fileUpload({      //refer documentation  
    useTempFiles : true,     
    tempFileDir : "/tmp/"
}));

app.use("/api/v1/message" , messageRouter)
app.use("/api/v1/user" , userRouter)
app.use("/api/v1/appointment", appointmentRouter)

dbConection();

// app.listen(4000, () => {
//     console.log("server listen on port 4000");
// })

app.use(errorMiddleware);
export default app;


