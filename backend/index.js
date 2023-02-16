import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/dbConnect.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'
import authRouter from './routes/authRoutes.js'
import personalChatRouter from './routes/personalChatRoutes.js'
import personalMessageRouter from './routes/personalMessageRoutes.js'
import groupChatRouter from './routes/groupChatRoutes.js'
import groupMessageRouter from './routes/groupMessageRoutes.js'
import userRouter from './routes/userRoutes.js'
import { Server } from 'socket.io'
 
dotenv.config()
const app = express()
 
const PORT = process.env.PORT || 5000

connectDB()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
 
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/pchat",personalChatRouter)
app.use("/api/gchat",groupChatRouter)
app.use("/api/pmsg",personalMessageRouter)
app.use("/api/gmsg",groupMessageRouter)
app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

const io =new  Server(server,{
    cors:{
        origin:"http://localhost:3000",
        credetials:true
    }
})

let onlineUsers = []

const addNewUser = (username,socketId)=> {
    !onlineUsers.some(user => user.username === username) && onlineUsers.push({username,socketId})
}
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}

const getUser = (username) => {
    return onlineUsers.find(user => user.username === username)
}

io.on("connection", (socket)=>{
    socket.on("newUser",(username)=>{
        addNewUser(username,socket.id)
    })
    socket.on("sendMsg",(data)=>{
        const sendUserSocket = getUser(data.receiver)
        if(sendUserSocket){
            const msg = {message:data.message,profile:data.profile,type:data.type,caption:data.caption}
            socket.to(sendUserSocket.socketId).emit("msg-receive",msg)
        }
    })
    socket.on("disconnect",()=>{
        // removeUser(socket.id)  
    })

})