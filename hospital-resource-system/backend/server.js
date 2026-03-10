const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const http = require("http")
const { Server } = require("socket.io")

const connectDB = require("./config/db")

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server,{
 cors:{origin:"*"}
})

io.on("connection",(socket)=>{
 console.log("Client connected:",socket.id)
})

app.get("/",(req,res)=>{
 res.send("Hospital Resource API Running")
})

const PORT = process.env.PORT || 5000

server.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`)
})