const { json } = require("express");
const express=require("express");
const mongoose=require("mongoose");
mongoose.set('strictQuery', false);

const jwt =require("jsonwebtoken");
const {connection, UserModel}=require("./configs/db");

const app=express();

app.use(express.json());


//route to register a user
app.post("/register",async(req,res)=>{
    const data=req.body;
    const newUser=new UserModel(data);
    await newUser.save();
    res.send("the user was registered");
})


//the users route to see all the data which is being stored into the database.
app.get("/users",async (req,res)=>{

    //req.query gives the query which is the data we are trying to filter(e.g., city=delhi)
    //let query=req.query;
    try{
    const users=await UserModel.find()
    res.send(users);
    }
    catch(err){
        res.send("cannot get users");
    }
})




//we are creating a login route and on each login a unique token is generated
app.post("/login",async (req,res)=>{
   const {email,password}=req.body;

   //jwt .sign takes in two arguments, payload for passing the data and the secret key.
   const token = jwt.sign({ course:"backend" }, 'masai');
    try{
        const user=await UserModel.find({$and:[{email:email},{password:password}]});
        if(user.length>0){
            res.send({"message":"login success","token":token});
        }
        else{
            res.send("login not successful");
        }
    }
    catch{
        console.log("the user details not found");
    }
})



//the token that we created in the login part is going to be used for the verifying process
app.get("/data",(req,res)=>{
    //passing the token in form of a query
    //const token=req.query.token

    //passing the token in the header under Authorization to get the data
    const token=req.headers.authorization;
    jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
            res.send({"msg":"data is present here"})
        }
        else{
            res.send("there is some problem in verifying");
        }
    })
})





app.listen(1700,async(req,res)=>{
    try{
        await connection;
        console.log("connection successful");
    }
    catch(err){
        console.log("server was not connected");
    }
})