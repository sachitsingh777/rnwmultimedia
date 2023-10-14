const express=require("express")
const app=express()
const cors=require("cors")
const { userRouter } = require("./router/user.router")
const { connection } = require("./db")
const { blogRouter } = require("./router/blog.router")
const { auth } = require("./middleware/Auth")
require("dotenv").config()


app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/users",userRouter)
app.use(auth)
app.use("/blogs",blogRouter)
app.listen(process.env.port,async()=>{
    try{
           await connection
           console.log("connected to the db")
    }
    catch(error){
        console.log(error)
        console.log(" Not connected to the db")
    }
    console.log("server is running ate the port is 8080")
})