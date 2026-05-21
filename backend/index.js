//used for dns issue for connect db
import dns from "dns"
dns.setServers(['1.1.1.1', '8.8.8.8']);

import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js";

const PORT = process.env.PORT ||5000;

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)




app.listen(PORT,()=>{
    connectDB()
    console.log("server is started ");
    
})


