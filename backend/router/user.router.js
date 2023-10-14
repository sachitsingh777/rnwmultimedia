const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const userRouter=express.Router()
 userRouter.get("/",async(req,res)=>{
    const user=await UserModel.find()
         res.status(200).send(user)
 })
userRouter.post("/register",async(req,res)=>{
      const {username,email,password}=req.body
    try{
        bcrypt.hash(password, 5, async(err, hash) =>{
           const user=new UserModel({username,email,password:hash})
           await user.save()
           res.send("registration succesfull")
        });
    }
    catch(error){
        res.send("not register")
    }
})

userRouter.post("/login",async(req,res)=>{
const {email,password}= req.body;
  try {
    const user = await UserModel.findOne({email});
    if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
          if(result){
            var token = jwt.sign({ username: user.username,userID:user._id }, 'rnw')
             res.status(200).send({msg:"Login Successfully",token:token,user:user})
          }else{
            res.status(200).send({msg:"Email and Password mismatch"})
          }
        });
    }else{
        res.status(200).send({msg:"Email is incorrect"})
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).send({err:error.message})
  }
   
})

module.exports={userRouter}

