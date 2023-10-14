const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    // console.log(req.body)
    const token=req.headers.authorization
     
    if(token){
        try{
            var decoded = jwt.verify(token.split(" ")[1], 'rnw');
            console.log(decoded)
            if(decoded){
                req.body.userID=decoded.userID
                req.body.username=decoded.username
                next()
            }else{
                res.send({"msg":" login please"})
            }
        }catch(error){
        res.send({"err":error.message})
    }
    }else{
        res.send({"msg":" login please"})
    }
    
}

module.exports={auth}