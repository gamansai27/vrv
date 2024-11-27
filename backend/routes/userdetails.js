const express=require('express');
const {verifyOTP,resetPassword} = require('../controllers/userController');
const router =express.Router();

router.post('/verifyotp',verifyOTP);
router.post('/resetpassword',resetPassword);
module.exports = router;
