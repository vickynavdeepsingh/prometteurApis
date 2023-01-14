const express=require('express');
const router= express.Router()
const userController=require("../controllers/userController")
const companyController=require('../controllers/companyController')

//? user routing *******************************************
router.post('/createUser',userController.createUser);
router.post('/login',userController.userLogin);
router.get('/getAllUsers',userController.getAllUsers);
router.get('/getUser/:userId',userController.getUserById);
router.put("/user/:userId",userController.updateUser);
router.delete('/delete/:userId',userController.deleteUser);
router.get('/getUserWithCompany',userController.getUserWithCompanyDetails)


//? company routing ********************************************

router.post('/createCompany',companyController.createCompany);
router.get('/getAllCompany',companyController.getAllCompany);
router.get('/getCompany/:companyId',companyController.getCompanyById);
router.put('/updateCompany/:companyId',companyController.updateCompany);
router.delete('/deleteCompany/:companyId',companyController.deleteCompany)


















module.exports=router;