const express=require('express')
const router=express.Router()
const authController=require('./Controllers/auth-controller')
const activateController=require('./Controllers/activate-controller')
const authMiddleware = require('./middlewares/auth-middleware')
const roomsController=require('./Controllers/rooms-controller')

// Post routes
router.post('/api/send-otp',authController.sendOtp)
router.post('/api/verify-otp',authController.verifyOtp)
router.post('/api/activate',authMiddleware,activateController.activateUser);
router.get('/api/refresh',authController.refresh)
router.post('/api/logout',authController.logout);
router.post('/api/create-room',authMiddleware,roomsController.createRoom);

// Get routes
router.get('/api/get-all-rooms',authMiddleware,roomsController.getAllRooms);

module.exports=router
