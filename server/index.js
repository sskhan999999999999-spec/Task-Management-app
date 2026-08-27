import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/user.routes.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("database connect succussfully");
})
.catch(()=>{
    console.log("something wrong while connecting database");
})

app.use('/api', router)

app.listen(8000,()=>{
    console.log(`server is running at port ${8000} `);
    
})
