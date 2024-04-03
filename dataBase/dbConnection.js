import mongoose from "mongoose";

export const dbConection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName : "SAURABH2"
    }).then(()=> {
        console.log("db connected");
    })
    .catch((err) => {
        console.log("error" , err);
    })
}
