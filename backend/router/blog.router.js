const express=require("express")
const { BlogModel } = require("../models/blog.model")

const blogRouter=express.Router()

blogRouter.get("/getAll",async(req,res)=>{
    try{
        let {page,title,category,sort,order}=req.query
        let search={}
        
        if(title){
            search.title={$regex:title,$options:"i"}
        }
        if(category){
            search.category=category
        }
        sort={}
        if(order=="asc"){
          sort.date=1
        }else if(order=="desc"){
            sort.date=-1
        }

        const blog=await BlogModel.find().sort(sort).skip((page-1)*5).limit(5)
         
         res.status(200).send(blog)
       }
       catch(error){
           res.status(400).send({"err":error.message})
       }
})

blogRouter.post("/add",async(req,res)=>{
try{
 const blog=new BlogModel(req.body)
  await blog.save()
  res.status(200).send("blog added successfully")
}
catch(error){
    res.status(400).send({"err":error.message})
}
})

	

blogRouter.patch("/update/:blogid",async(req,res)=>{
    const {blogid}=req.params
    const blog=await BlogModel.findOne({_id:blogid})
    try{
        if(req.body.userID==blog.userID){
            await BlogModel.findByIdAndUpdate({_id:blogid},req.body)
            res.status(200).send(`blog has been update by id:${blogid}`)
        }else{
            res.status(200).send(`not authorised`)
        }
    }
    catch(error){
        res.status(400).send({"err":error.message})
    }
})

blogRouter.delete("/delete/:blogid",async(req,res)=>{
    const {blogid}=req.params
    const blog=await BlogModel.findOne({_id:blogid})
    try{
        if(req.body.userID==blog.userID){
            await BlogModel.findByIdAndDelete({_id:blogid},req.body)
            res.status(200).send(`blog has been delete by id:${blogid}`)
        }else{
            res.status(200).send(`not authorised`)
        }
    }
    catch(error){
        res.status(400).send({"err":error.message})
    }
})

blogRouter.get("/get",async(req,res)=>{
    try {
    const blogs=await BlogModel.find({userID : req.body.userID})
    res.status(200).send(blogs)
}
catch(error){
    res.status(400).send({"err":error.message})
}
})

blogRouter.get("/get/:blogid", async (req, res) => {
    const { blogid } = req.params;

    try {
        const blog = await BlogModel.findOne({ _id: blogid });

        if (!blog) {
           
            res.status(404).send("Blog not found");
        } else {
            
            res.status(200).json(blog);
        }
    } catch (error) {
        
        res.status(500).send({ error: "Internal Server Error" });
    }
});





module.exports={blogRouter}