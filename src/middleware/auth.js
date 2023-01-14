const jwt= require('jsonwebtoken');
const userModel= require('../models/userModel');
const validate=require('../validations/validate');


// Authentication
const authentication= async(req, res,next)=>{
    try {
        
    } catch (error) {
        res.status(500).json({status:false,msg:error.message})
    }
}






module.exports.authentication=authentication;