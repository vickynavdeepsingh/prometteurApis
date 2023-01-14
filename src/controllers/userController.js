const users= require('../models/userModel');
const validEmailId=require("email-validator");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const userModel = require('../models/userModel');
const validate=require('../validations/validate')

//?user create API 
const createUser=async(req, res)=>{
 try {
    let data = req.body;
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is required to add a user" });
        let validString = /\d/; //validating the string for numbers 
         //Validation for data is present inside body or not
        if (!data.name) return res.status(400).send({ status: false, msg: "First Name is required" });
        if (!data.title) return res.status(400).send({ status: false, msg: "Title is required" });
        if (!data.email) return res.status(400).send({ status: false, msg: "Email is required" });
        if (!data.password) return res.status(400).send({ status: false, msg: "Password is required" });
         //checking if the name are valid string
        if (validString.test(data.name)) return res.status(400).send({ status: false, msg: "Enter a valid First Name" });

        let validTitle = ['Mr', 'Mrs', 'Miss']; //validating the title
        if (!validTitle.includes(data.title)) return res.status(400).send({ status: false, msg: "Title should be one of Mr, Mrs, Miss" });
         
        //checking if the email is valid by using email-validator package
        if (!validEmailId.validate(data.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" });

        //checking if the email is already exist
        let uniqueEmail = await users.findOne({ email: data.email });
        if (uniqueEmail) return res.status(400).send({ status: false, msg: "Email already exist" })

        let showUserData = await users.create(data);
        res.status(201).send({ status: true, data: showUserData });
 } catch (err) {
    res.status(500).send({ status: false, msg: err.message }); 
 }
}

//?Login Api
const userLogin=async(req, res)=>{
    try {
        let data = req.body;
        //Below is the validation for the data
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Email and password is required to login" });
        if (!data.email) return res.status(400).send({ status: false, msg: "Email is required" });
        if (!data.password || data.password.trim().length == 0) return res.status(400).send({ status: false, msg: "Password is required" });

         //checking if the email is valid by using email-validator package
         if (!validEmailId.validate(data.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })

          //checking if the email is already exist
        let getUsersData = await users.findOne({ email: data.email});
        if (!getUsersData) return res.status(401).send({ status: false, msg: "EmailId is incorrect" });

        if(data.password != getUsersData.password) return res.status(401).send({ status: false, msg: "Password is incorrect"});

         //generating the token for logged in author
         let token = jwt.sign({ authorId: getUsersData._id.toString() },"lama", { expiresIn: "6d" });

          //sending the token to the client in response in the header
        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, msg: "Logged in successfully", token: token });

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });  
    }

}


//get all users Api
let getAllUsers=async(req, res)=>{
    try {
        let allUsers= await userModel.find().populate('companyId');
        res.status(200).send({users:allUsers}) 
    } catch (err) {
        res.send({msg:err.message})
    }
  
}

//?Get userById
const getUserById=async(req, res)=>{
    try {
       let userId= req.params.userId;
        if(!validate.isValidObjectId(userId)){
            return res.status(400).send({status:false, msg:"Please enter the valid userId"})
        }
        let userData= await userModel.findById({_id:userId})
        if(!userData){
            return res.status(404).json({status:false, msg:"userId not found"})
        }
        return res.status(200).json({status:true,message: "User profile details", data:userData})
        
    } catch (error) {
       res.status(500).json({status:false, msg:error.message}) 
    }
}
//?Update API 
let updateUser=async(req, res)=>{
    try {
        let getUserId = req.params.userId;

        let findUserById = await userModel.findById(getUserId);//finding the user in the database to check whether it is valid or not
        if (!findUserById) return res.status(404).send({ status: false, msg: "No such user exist" });
        let data = req.body; 
          
        let updateUser = await userModel.findByIdAndUpdate(
            { _id: getUserId },
            {
                $set: { title: data.title, name: data.name, phone: data.phone,email:data.email,password:data.password,address:data.address}
            },
            { new: true }
        )
        res.status(200).send({ status: true, data: updateUser });
    }catch(error){
        res.status(500).send({ status:false, error: error.message }); 
    };
        
}

//?Delete API 

const deleteUser=async(req, res)=>{
try {
    const userId = req.params.userId

        let user = await userModel.findByIdAndDelete({ _id: userId });
        if (!user) return res.status(404).send({ msg: "user not  found" });
        res.status(200).send({ msg: "user is deleted" });
} catch (error) {
    res.status(500).json({status:false,msg:error.message})
}
}

const getUserWithCompanyDetails=async(req, res)=>{
    try {
        let userData=req.body.userId;
        let allData=await userModel.find({_id:userData}).populate("companyId");
        res.status(200).json({status:true,msg:allData})
    } catch (error) {
       res.status(500).json({status:false,msg:error.message}) 
    }
}






    




module.exports.createUser=createUser;
module.exports.userLogin=userLogin;
module.exports.getAllUsers=getAllUsers;
module.exports.updateUser=updateUser;
module.exports.deleteUser=deleteUser;
module.exports.getUserById=getUserById;
module.exports.getUserWithCompanyDetails=getUserWithCompanyDetails;





