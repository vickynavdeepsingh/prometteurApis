const mongoose=require('mongoose');
const { schema } = require('./userModel');
const ObjectId = mongoose.Schema.Types.ObjectId

const companySchema= new mongoose.Schema({
    companyName:{
        type:String,
    },
    establish:{
        date:String,
    },
    ceoName:{
        type:String,
    }

},{timestamps:true})

module.exports=mongoose.model("company",companySchema)