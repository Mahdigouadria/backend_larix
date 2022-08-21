const router=require('express').Router()
//const EmployeeController = require('../Controllers/EmployeeController')
const UserController=require('../Controllers/UserControlller')
const auth=require('../middleware/auth')
const authAdmin=require('../middleware/authAdmin')
const authUser=require('../middleware/authUser')
const upload = require("../utils/multer");


 router.post('/adduser',upload.single("image"),UserController.AddUser)
 /*router.post('/adduser/addemployee',upload.single("image"),UserController.AddUser)
 router.post('/adduser/addclient',upload.single("image"),UserController.AddUser)*/
 router.get('/allUsers',auth,authAdmin,UserController.alluser)

 router.get('/profile',auth,authUser,UserController.getprofile)


 router.post('/login',UserController.login) 

//

 router.put('/:id',auth,authAdmin,upload.single("image"),UserController.updateUser)
 router.delete('/deleteuser/:id',auth,authAdmin,UserController.deleteUser)


module.exports=router