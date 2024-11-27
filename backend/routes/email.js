const express=require('express');
const {customercaremail} = require('../controllers/emailcontoller');
const { sendOTP } = require('../controllers/userController');
const router =express.Router();


router.post('/customer',customercaremail);
router.post('/sendotp',sendOTP);

module.exports = router;