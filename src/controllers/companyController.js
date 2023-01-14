const companyModel=require('../models/companyModel');
const userModel= require('../models/userModel');
let validString = /\d/; //validating the string for numbers and check spaces using regEx
const validate=require('../validations/validate')


const createCompany=async(req, res)=>{
    try {
      const data = req.body
      //Validating data is empty or not
      if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is required to create a company" });
      //Validation for data is present inside body or not
      if (!data.companyName) return res.status(400).send({ status: false, msg: "companyName is required" });
      if (!data.establish) return res.status(400).send({ status: false, msg: "establish date of company is required" });
      if (!data.ceoName) return res.status(400).send({ status: false, msg: "CEO name is required" });
      //validating the data for numbers in the body
      if (validString.test(data.name) || validString.test(data.ceoName))
      return res.status(400).send({ status: false, msg: "Data contains only string" });

      // const user = await userModel.findById(data.userId)
      //  if (!user) return res.status(400).send({ status: false, msg: "invalid user" })
       const company = await companyModel.create(data)
        return res.status(201).send({ status: true, data: company })
    } catch (error) {
      res.status(500).json({status:false,msg:error.message})
    }

}

//?get all company

const getAllCompany=async(req, res)=>{
  try {
    const allCompany= await companyModel.find()
    res.status(200).json({status:true, cList:allCompany})
  } catch (error) {
    res.status(500).json({status:false, msg:error.message})
  }
}

//?get company by id 
const getCompanyById=async(req, res)=>{
  try {
    let companyId= req.params.companyId;
        if(!validate.isValidObjectId(companyId)){
            return res.status(400).send({status:false, msg:"Please enter the valid companyId"})
        }
        let companyData= await companyModel.findById({_id:companyId})
        if(!companyData){
            return res.status(404).json({status:false, msg:"company not found"})
        }
        return res.status(200).json({status:true, message: "company profile details", data:companyData})
  } catch (error) {
    res.status(500).json({status:false, msg:error.message})
  }
}

//? Update Company

const updateCompany=async(req, res)=>{
  try {
        let companyId= req.params.companyId;
        let companyData= req.body;
        let update={};
        let {companyName, establish, ceoName}= companyData;
        //checking objectId is valid or not
        if(!validate.isValidRequestBody(companyData))
           return res.status(400).json({status:false, msg:"please enter data for update"})
        if(!validate.isValidObjectId(companyId)){
        return res.status(400).json({status:false, msg:"please Enter the valid ObjectId"})
       }

       //validation on company name
       if(companyName)
       if(!validate.isValid(companyName))
       return res.status(400).json({status:false, msg:"please enter the valid company name"})
       update["companyName"]=companyName;
      
        if(establish)
        if(!validate.isValid(establish))
        return res.status(400).json({status:false, mag:"please enter the valid establish data"})
        update["establish"]=establish

        if(ceoName)
        if(!validate.isValid(ceoName))
        return res.status(400).json({status:false, mag:"please enter the valid ceo name data"})
        update["ceoName"]=ceoName
        
        let updateData= await companyModel.findByIdAndUpdate({_id:companyId},{$set:update},{new:true})
        return res.status(200).json({status:true, msg:"successfully updated", data:updateData})

  } catch (error) {
    res.status(500).json({status:false, msg:error.message})
  }
}

//? Delete Api

const deleteCompany=async(req,res)=>{
  try {
    let companyId = req.params.companyId

    if (!validate.isValidObjectId(companyId)) {
      return res.status(400).send({ status: false, message: "enter valid productId" });
    }
    let companyData = await companyModel.findOne({ _id: companyId})
    if (!companyData) {
      return res.status(404).send({ status: false, message: "company already deleted" });
    }
    let deletedData = await companyModel.findOneAndDelete({ _id:companyId },{ new: true })
    return res.status(200).send({ status:true, message: "successfully deleted", data: deletedData })
  } catch (error) {
    res.status(500).json({status:false, msg:error.message})
  }
}


module.exports.createCompany=createCompany;
module.exports.getAllCompany=getAllCompany;
module.exports.getCompanyById=getCompanyById;
module.exports.updateCompany=updateCompany;
module.exports.deleteCompany=deleteCompany;