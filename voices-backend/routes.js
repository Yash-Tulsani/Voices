const express=require('express')
const router=express.Router()
const authController=require('./Controllers/auth-controller')
const activateController=require('./Controllers/activate-controller')
const authMiddleware = require('./middlewares/auth-middleware')

router.post('/api/send-otp',authController.sendOtp)
router.post('/api/verify-otp',authController.verifyOtp)
router.post('/api/activate',authMiddleware,activateController.activateUser);
router.get('/api/refresh',authController.refresh)
router.post('/api/logout',authController.logout);

module.exports=router
