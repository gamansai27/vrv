const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
    },
    username : {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phonenumber : {
        type:Number,
        required:true,
    },
    password : {
        type:String,
        required:true,
    },
    role : {
        type:String,
        required:true,
    }
});
const Employee = mongoose.model('Employee',employeeSchema);
module.exports = Employee ;
