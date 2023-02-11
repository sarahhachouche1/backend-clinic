const asyncHandler =  require('express-async-handler');
const User =  require('../../model/UsersModel');
const jwt = require('jsonwebtoken')
const generateToken =require('../../utils/generateToken')
const bcrypt = require('bcryptjs')


//@desc Register new user
//@route POST /user/adduser
//@acces Public
const registerUser = asyncHandler(async (req,res) =>{
  const{name,email,password}=req.body
  const role = req.body.role || User.schema.path('role').defaultValue;
	const existingUser = await User.findOne({email}).lean(true);
	if (existingUser) {
			res.status(403);
		  res.send("User Already Exists")
		} 
  
  if(role == 'superAdmin')
  {
    const superAdminCount = User.count({ role: 'superadmin' }).exec();
    if (superAdminCount >= 1) {
        res.send('Cannot create another superadmin account');
      }
  }    
  console.log(role)
  
  const user= await User.create({
    name,
    email,
    password,
    role 
  })
  
  if (user) {
				res.status(201);
				return res.send( {name,email,password,role,token: generateToken(user._id)})
			} else {
				res.status(403);
				return res.send("Error Creating User")
			}
  
 
})


//@desc Authenticate user
//@route POST /user/login
//@acces Public
const loginUser = asyncHandler(async(req,res) =>{
   const {email, password} =req.body
   const user = await User.findOne({email})

   if(user && (await bcrypt.compare(password, user.password)))
   {
     /*  res.cookie('token',generateToken(user._id),{ maxAge: 30 * 24 * 60 * 60 * 1000,httpOnly:true})*/
       res.status(200).send( {token: generateToken(user._id)})
   }
   else{
     res.status(400)
     throw new Error('Invaled credentials')
   }
})

//@desc get user data
//@route GET /user/me
//@acces Public
const getMe= asyncHandler(async(req,res) =>{
    const {_id, name,email} = await User.findById(req.user.id)

    res.status(200).json({
      id:_id,
      name,
      email
    })
})

module.exports = {
    registerUser,
    loginUser,
    getMe

}
