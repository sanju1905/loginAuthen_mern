const express =require('express');
const mongoose=require('mongoose');
const Details=require('./mode');
const jwt=require('jsonwebtoken');
const cors=require('cors');
//const bodyParser = require("body-parser")


const middleware=require('./middleware');
app=express();
app.use(cors({
    origin:"*"
}))
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb+srv://sanjay:sanjay@cluster0.fjcbkym.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>
    {
        console.log("Db connected");
    }
).catch(err=> console.log(err.message));


// Register Process
app.post('/addDetails',async(req,res)=>
{
    const {name,password,confirmpassword,email}=req.body
    try{
        
        let exist=await Details.findOne({email})
        if(exist)
        {
            return res.status(400).send("User already Exist")
        }
        if(password !== confirmpassword)
        {
            return res.status(400).send("Passwords are not matching")
        }
        let newUser=new Details({
            name,
            password,
            confirmpassword,
            email
        })
        await newUser.save();
        return res.status(200).send("Registered Successfully")
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).send("Internal Server Error")
    }
});
 //Login
app.post('/login',async(req,res)=>
{
    try{
       const {email,password}=req.body;
       let exist=await Details.findOne({email});
       if(!exist)
       {
        return res.status(400).send("User not found");
       }
       if(exist.password !== password)
       {
        return res.status(400).send("Invalid Credentials")
       }
       let payload={
        user:
        {
            id:exist.id
        }
       }
       //Token Generation
       jwt.sign(payload,'jwtsecret',{expiresIn:3600000},
        (err,token)=>
            {
               if (err) throw err;
               return res.json({token});
        
            })
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).send("Server Error")
    }
})
// portofoli
app.get('/getprofile',middleware,async(req,res)=>
{
    try{
        let exist=await Details.findById(req.user.id);
        if(!exist)
        {
            return res.status(400).send("User not found");
        }
        res.json(exist);
    }
    catch(err)
    {
      return res.status(500).send("Server Error");
    }
})


//delete
app.delete('/deleteprofile/:id',async(req,res)=>
{
    try{
        let exist=await Details.findByIdAndDelete(req.params.id);
        if(!exist)
        {
            return res.status(400).send("User not found");
        }
       return res.json(exist);
    }
    catch(err)
    {
      return res.status(500).send("Server Error");
    }
})
//all details
app.get('/getall',async(req,res)=>
{
    try{
        const AllData=await Details.find();
         return res.json(AllData);
    }
    catch(err)
    {
        console.log(err.message);
    }
})

app.get('/',(req,res)=>
{
    res.send("Sanjay Kandulaa");
    res.end();
}).listen(5000,()=>
{
    console.log("Server is running");   
});


