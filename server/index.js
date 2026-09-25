import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import { Server } from "socket.io"

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://192.168.1.18:3000",
        "https://aethermangamant.vercel.app"
    ],
    credentials: true
}))

app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("database connect succussfully")
})
.catch((error)=>{
    console.log("something wrong while connecting database", error)
})

console.log(process.env.MONGODB_URI)

app.use('/api', router)

const server = app.listen(8000, "0.0.0.0", ()=>{
    console.log(`server is running at port 8000`)
})

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "http://192.168.1.18:3000",
            "https://aethermanagment.vercel.app/"
        ],
        credentials: true
    }
})
app.set("io",io)

io.on("connection", (socket)=>{
    console.log("user connected", socket.id)

    socket.on("message", (data)=>{
        console.log("message received", data)
        io.emit("message", data)
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id)
    })
})