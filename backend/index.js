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
 
dotenv.config()
const app = express()
 
const PORT = process.env.PORT || 5000

connectDB()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
 
app.use("/api/auth",authRouter)
app.use("/api/pchat",personalChatRouter)
app.use("/api/gchat",groupChatRouter)
app.use("/api/pmsg",personalMessageRouter)
app.use("/api/gmsg",groupMessageRouter)
app.use(notFound)
app.use(errorHandler)

 app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
