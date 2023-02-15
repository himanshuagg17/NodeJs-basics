const mongoose=require("mongoose");
mongoose.set('strictQuery', false);

//creating the connection
const connection=mongoose.connect("mongodb://127.0.0.1:27017/user");

//creating a schema
const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number
})


//screating a Model
const UserModel=mongoose.model("kids",UserSchema);

module.exports={
    UserModel,
    connection
}