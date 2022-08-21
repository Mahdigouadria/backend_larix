
const vm = require("v-response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ValidateUser =require('../validation/Users.validation')
const _ = require("underscore");
const EmployeeModel = require("../models/EmployeeModel");
const UserModel = require("../models/UserModel");
const cloudinary = require("../utils/cloudinary");



const EmployeeController={

  addEmployee :async (req,res)=>{
          console.log({req:req.body});
            const {errors,isValid}=ValidateUser(req.body)
            const { first, email, password,cfPassword, education ,  
                mobile ,
                department ,
                dob  ,
                position , 
                adresse  ,
                last  ,
                username,
                gender
              
               } = req.body;
        try {
          if (!isValid) {
                res.status(404).json(vm.ApiResponse(false,404,errors))
        
            }else{


             await EmployeeModel.findOne({email:req.body.email}).then(async(exist)=>{
                    if ((exist)) {
                        errors.email="email already exist"
                        res.status(404).json(vm.ApiResponse(false,404,"emailis already exist"))
        
                    }
                    else{
                        if(password!==cfPassword)
                        return  res.status(404).json(vm.ApiResponse(false,404,"password is not matched"))

        
                      const passwordHash = await bcrypt.hash(password, 12);
                   
                    //  console.log(passwordHash);
                    if (!req.file || req.file.path ==undefined || req.file.path ==null){

                    let body = req.body;
                    let bodyw = _.extend(
                      body
                    );
                    // console.log("underscore"+JSON.stringify(bodyw));




        
                      var newEmployee = new EmployeeModel ({
                        first : first,
                        last : last,
                        email:email,
                        password:passwordHash,
                        education: education ,  
                        mobile : mobile,
                        department: department,
                        dob  : dob,
                        position   : position  ,
                        adresse : adresse ,
                        gender:gender,
                        username:username
                      })
                    }else{
                      const result = await cloudinary.uploader.upload(req.file.path);
                     const    image=result.secure_url
                     const     cloudinary_id= result.public_id
                      var newEmployee = new EmployeeModel({

                        first : first,
                        last : last,
                        email:email,
                        password:passwordHash,
                        education: education ,  
                        mobile : mobile,
                        department: department,
                        dob  : dob,
                        position   : position  ,
                        adresse : adresse ,
                        gender:gender,
                        username:username,
                        image: image,
                        cloudinary_id: cloudinary_id
                      })

                    }
                      console.log({newEmployee});
                     await newEmployee.save()
                      .then((insc) => {
                         return res.status(201).json(vm.ApiResponse(true, 201, insc));
                       })
                      .catch((err) => {
                        return res.status(500).json(vm.ApiResponse(false, 500, err));
                      });         
                    }
                })
               
            }
        
           
        } catch (err) {
          console.log({err});
            res.status(500).json({errorAddEmployee:err})
            
        }
        
        },


        login: async (req, res) => {
            try {
              const { email, password } = req.body;
              const user = await Employee.findOne({ email });
              if (!user)
                return res.status(400).json({ msg: "This email does not exist." });
          
              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });
          
              const refresh_token = createRefreshToken({ id: user._id });
          
          
              res.json({ msg: "Login success!", refresh_token: refresh_token });
            } catch (err) {
              return res.status(500).json({ msg: err.message });
            }
          },
          alluser:async(req,res)=>{
            await Employee.find({}).then((user)=>{
                res.status(200).json({user})

            })



          },
          

    
          
          getAllEmployee:async(req,res)=>{
            try {
                const employee = await EmployeeModel.find();
                console.log({employee})
                res.status(200).json({employee,numberEmp:employee.length})
            } catch (error) {
              console.log({err})
              res.status(500).json({err})
            }
          },


       

    }
    
    
    
    const createRefreshToken = (payload) => {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "7d",
        });
     
      };
  



module.exports=EmployeeController


