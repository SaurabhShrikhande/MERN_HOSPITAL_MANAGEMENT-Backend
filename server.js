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
