const mongoose= require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema= new mongoose.Schema({
  companyId:{
    type:ObjectId,
    ref:"company"
   },
  title:{
    type:String,
    required:true,
    trim:true,
    enum:["Mr", "Mrs", "Miss"]
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 15,
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    pin: { type: String, trim: true },
  }
},{timestamps:true})


module.exports=mongoose.model("user",userSchema);