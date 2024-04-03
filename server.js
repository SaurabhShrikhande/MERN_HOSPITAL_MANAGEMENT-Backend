import app from "./app.js";
import clodinary from "cloudinary"

clodinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT, () => {
    console.log(`server listen on port ${process.env.PORT}`);
})







































/*
PORT=10000

MONGO_URL=mongodb+srv://saurabhshrikhande200:pbIBwz8AaQTnlT4Q@cluster0.7zkcabz.mongodb.net/

FRONTEND_URL=http://localhost:5173

DASHBOARD_URL=http://localhost:5174

JWT_SECRET_KEY=bjtrtgrgjoigrbf

JWT_EXPIRES=7d

COKIE_EXPIRE=7

CLOUDINARY_CLOUD_NAME=dzsialn2k

CLOUDINARY_API_SECRET=75c8u7tUJiftweG3GuvjBjrds7A
                   
CLODINARY_API_KEY=787692149769694
 
*/