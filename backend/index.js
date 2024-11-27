const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./config/mbdatabase");
const dotenv = require('dotenv');
const cors=require('cors');
const {hashPassword} = require('./utils/passwordUtils');
const cookieParser = require('cookie-parser');
const Employee = require('./models/employee');
const {connectRedis} = require("./config/redisdatabase");
const rateLimit = require('express-rate-limit');
dotenv.config();

app.use(cors(
    {origin:"https://vrv-yyiz-bz391cwny-gaman-sais-projects.vercel.app/",
     method : ["POST","GET"],
     credentials:true
    }
));
app.use(bodyParser.json());
app.use(cookieParser());
connectDB();
connectRedis();

const limiter = rateLimit({
    max: 1000,
    windowMs: 60*60*1000,
    message: "We have received too many requests, please try again after later" 
});

app.use('/api', limiter);

app.use('/api/auth',require('./routes/auth'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/email',require('./routes/email'));
app.use('/api/user',require('./routes/userdetails'));

//temporary routes remove in production

app.post('/test', async(req,res) => {
    console.log("hello world");
    res.status(200).json({success:true , message:"hello world"})
});

app.post('/register',async(req,res) => {
    var{name,username,email,phonenumber,password,role}=req.body;
    try{
        const existingEmployee = await Employee.findOne({username});
        if(existingEmployee){
            return res.status(400).json({success:false , message:"Employee already exists"})
        }
        password = await hashPassword(password);
        const newEmployee = new Employee({
            name,
            username,
            email,
            phonenumber,
            password,
            role
        });
        await newEmployee.save();
        res.status(200).json({success:true , message:"Employee created"})
    }
    catch(error){
        res.status(500).json({success:false , message:error.message})
    }
    
});

app.listen(4000 , () => {
    console.log("Server is running");
})
