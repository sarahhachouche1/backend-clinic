const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
/*const roleEnum = ('admin', 'superadmin', 'user', 'guest')*/

const userSchema = new Schema({
  name: { 
    type: String, 
    required: [true , 'Please add your name']
},
  email: { 
    type: String, 
    required : [true , 'Please add an email'],
    lowercase: true,
    unique: true
 },
  password: { 
    type: String, 
    required:[true , 'Please add a password']
},
  role: { type: String,
          default: 'user' 
        },
},
  {timestamps:true}
);

//fire a function after doc saved to db
userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)   
  next();
})
module.exports = mongoose.model('user',userSchema)