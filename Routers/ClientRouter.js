const router=require('express').Router()
const ClientController=require('../Controllers/ClientController')
const auth=require('../middleware/auth')
const authAdmin=require('../middleware/authAdmin')
const upload = require("../utils/multer");
 router.post('/addclient',upload.single("image"),ClientController.AddUser)
 router.get('/getallclients',ClientController.getallclients)






module.exports=router