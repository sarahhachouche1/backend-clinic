const express = require('express')
const router = express.Router();
const authController= require('../controllers/user/userController')
const userValidation = require('../controllers/user/userValidator')
const {protect} =require('../middleware/authMiddleware')

router.post('/adduser',userValidation,authController.registerUser)
router.post('/login',authController.loginUser)
router.get('/me',protect,authController.getMe)





module.exports = router