const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const http = require("http")
const { Server } = require("socket.io")

const bedRoutes = require("./routes/bedRoutes")
const patientRoutes = require("./routes/patientRoutes")
const equipmentRoutes = require("./routes/equipmentRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")
const emergencyRoutes = require("./routes/emergencyRoutes")
const hospitalRoutes = require("./routes/hospitalRoutes")
const nationalRoutes = require("./routes/nationalRoutes")

const connectDB = require("./config/db")

dotenv.config()

const app = express()

// connect database
connectDB()

// middleware
app.use(cors())
app.use(express.json())
app.use("/api/patients", patientRoutes)
app.use("/api/beds", bedRoutes)
app.use("/api/equipment", equipmentRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/emergency", emergencyRoutes)
app.use("/api/hospitals", hospitalRoutes)
app.use("/api/national", nationalRoutes)

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