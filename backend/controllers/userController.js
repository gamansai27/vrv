const crypto = require('crypto');
const Employee = require("../models/employee");
const {redisClient} = require('../config/redisdatabase'); 
const {sendOTPEmail} = require('../services/OTPEmailService');
const { hashPassword } = require('../utils/passwordUtils');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

//Function to generate otp
function generateRandomNumber() {
    return crypto.randomInt(100000,1000000);
}

const sendOTP = async(req, res) => {
   try{ 
    const {username} =req.body;
    const employee = await Employee.findOne({username});
    if(!employee){
        return res.status(401).json({ message: "Employee Does Not Exist" });
    }
    const randomNumber = generateRandomNumber();
    await redisClient.set(`OTP:${employee.email}`,randomNumber, {EX:10*60});//OTP expires in 10 minutes 
    await sendOTPEmail({email:employee.email, OTP:randomNumber});
    const Token = jwt.sign({username:employee.username,email:employee.email}, accessTokenSecret, { expiresIn: '30m' });
    res.cookie('otpVerificationToken', Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 20 * 60 * 1000 // 20 mins
    });
    res.status(200).json({message:"OTP sent successfully"});
  }
   catch (err) {
        res.status(401).json({ message: 'LOSERRRRRRRR' });
    }
}

const verifyOTP= async(req,res) =>{
    try{
        const {username, OTP} = req.body;
        const { otpVerificationToken } = req.cookies;
        if(!OTP){
            console.log("1");
            return res.status(400).json({ message: "Incorrect OTP"});
        }
        if(!username){
            console.log("2");
            return res.status(400).json({message:"Invalid Verification"});
        }
        const decoded = jwt.verify(otpVerificationToken, accessTokenSecret);
        if(decoded.username!=username){
            console.log("3");
            return res.status(400).json({message:"Invalid Verification"});
        }
        const key = `OTP:${decoded.email}`;
        const originalOTP = await redisClient.get(key);
        if(originalOTP!=OTP){
            console.log("4");
            return res.status(400).json({ message: "Incorrect OTP"});
        }
        const Token = jwt.sign({username:decoded.username,OTP:"sent"}, accessTokenSecret, { expiresIn: '10m' });
        res.cookie('passwordResetToken', Token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 10 * 60 * 1000 // 10 mins
        });
        res.clearCookie('otpVerificationToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({message:"OTP verified"});
    }
    catch(error){
        res.status(401).json({ message: 'Verification Failed' });
    }
}

const resetPassword= async(req,res) =>{
    try{
        const {username, newpassword} = req.body;
        const { passwordResetToken } = req.cookies;
        
        //Add password validation
        // if(validatePassword(newpassword)){   
        //     return res.status(400).json({ message: "Password is in Invalid format"});
        // }

        if(!username){
            return res.status(400).json({message:"Password reset failed"});
        }
        const decoded = jwt.verify(passwordResetToken, accessTokenSecret);
        if(decoded.username!=username){
            console.log(decoded.username);
            return res.status(400).json({message:"Password reset failed"});
        }
        if(!decoded.OTP || decoded.OTP!="sent"){
            console.log(decoded.OTP);
            return res.status(400).json({message:"Password reset failed"});
        }
        const hashedpassword = await hashPassword(newpassword);
        const updatedEmployee = await Employee.updateOne({username:username},{$set:{password:hashedpassword}});
        if(!(updatedEmployee.modifiedCount>0)){
            console.log("upd");
            return res.status(400).json({message:"Password reset failed"});
        }
        res.clearCookie('passwordResetToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({message:"Password reseted successfully"})
    }
    catch(error){
        console.log(error)
        res.status(401).json({ error: 'Failed to reset password' });
    }
}
module.exports = {sendOTP,verifyOTP,resetPassword};