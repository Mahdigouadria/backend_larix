const router=require('express').Router()
const EmployeeController=require('../Controllers/EmployeeController')
const auth=require('../middleware/auth')
const authAdmin=require('../middleware/authAdmin')
const authuser=require('../middleware/authUser')

const upload = require("../utils/multer");

 router.post('/addemployee',upload.single("image"),EmployeeController.addEmployee)

 router.get("/allemployee",EmployeeController.getAllEmployee)

 router.delete('/deletemployee/:id',EmployeeController.deleteEmployee)


 //router.delete('/deleteemployee/:id',auth,authAdmin,EmployeeController.deleteUser)


module.exports=router