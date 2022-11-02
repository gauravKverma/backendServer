const {Schema, model} = require("mongoose");

const User = new Schema({
    name:String,
    email:String,
    password:String,
})

const UserModel = model("user",User);
module.exports=UserModel;
