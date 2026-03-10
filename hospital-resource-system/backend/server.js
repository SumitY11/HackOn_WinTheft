const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const http = require("http")
const { Server } = require("socket.io")

const connectDB = require("./config/db")

dotenv.config()

const app = express()

// connect database
connectDB()

// middleware
app.use(cors())
app.use(express.json())
const patientRoutes = require("./routes/patientRoutes")
app.use("/api/patients", patientRoutes)

// test route
app.get("/", (req,res)=>{
 res.send("Hospital API Running")
})

// create HTTP server
const server = http.createServer(app)

// socket setup
const io = new Server(server,{
 cors:{origin:"*"}
})

io.on("connection",(socket)=>{
 console.log("Client connected:",socket.id)
})

// start server
const PORT = process.env.PORT || 5000

server.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`)
})