const express=require('express');
const authcontroller = require('../controllers/authcontroller');
const router =express.Router();

router.post('/login',authcontroller.login);
router.post('/logout',authcontroller.logout);
router.post('/token', authcontroller.refreshAccessToken);
router.get('/validate',authcontroller.validateToken);

module.exports = router;