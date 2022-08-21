const User=require('../models/ClientModel')
const vm = require("v-response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ValidateUser =require('../validation/Users.validation')
const _ = require("underscore");
const cloudinary = require("../utils/cloudinary");
const ClientModel = require('../models/ClientModel');


const ClientController={

        AddUser :async (req,res)=>{
          try {
            console.log({req:req.body.username});
            let newUser;
            const {errors,isValid}=ValidateUser(req.body)
            const { username, email, password,cfPassword,  
                mobile ,
                currency ,
                date  ,
                billing_method,
                company_name 
                } = req.body;
                
            if (!isValid) {
                res.status(404).json(vm.ApiResponse(false,404,errors))
        
            }else{


             await   ClientModel.findOne({email:req.body.email}).then(async(exist)=>{
                    if ((exist)) {
                        errors.email="email already exist"
                        res.status(404).json(vm.ApiResponse(false,404,errors))
        
                    }
                    else{
                        if(password!==cfPassword)
                        return  res.status(404).json(vm.ApiResponse(false,404,"password is not matched"))

        
                      const passwordHash = await bcrypt.hash(password, 12);
                      if (!req.file || req.file.path ==undefined || req.file.path ==null){
                        console.log({req:req.file})
                    //  console.log(passwordHash);


                    let body = req.body;
                    let bodyw = _.extend(
                      body
                    );
                   // console.log("underscore"+JSON.stringify(bodyw));



                      // console.log({"add client ":req.body});
        
                       newUser = new ClientModel({
                       username:username,
                        email:email,
                        password:passwordHash,  
                        mobile : mobile,
                        currency: currency,
                        date  : date,
                        billing_method : billing_method,
                        company_name : company_name                                                                 
                         })
                        }else{
                          const result = await cloudinary.uploader.upload(req.file.path);
                          const    image=result.secure_url
                          const     cloudinary_id= result.public_id
                           newUser = new ClientModel({
                            username:username,
                            email:email,
                            password:passwordHash,  
                            mobile : mobile,
                            currency: currency,
                            date  : date,
                            billing_method   : billing_method,
                            company_name : company_name  ,
                            image: image,
                            cloudinary_id: cloudinary_id,
                         
                          })
  
                        }
                     console.log({newUser});
                     await newUser.save()
                      .then((insc) => {
                        return res.status(201).json(vm.ApiResponse(true, 201, insc));
                      })
                      .catch((err) => {
                        return res.status(500).json(vm.ApiResponse(false, 500, err));
                      });         
                    }
                })
               
            }
        
           
        } catch (error) {
          console.log({error})
            res.status(500).json({error:error})
            
            
        }
        
        },



        getallclients:async(req,res)=>{
          try {
            const Clients = await User.find();
            console.log({Clients})
            res.status(200).json({Clients,clientcount:Clients.length})
        } catch (error) {
          console.log({err})
          res.status(500).json({err})
        }





        }
        
    

    }


    
   
  




module.exports=ClientController