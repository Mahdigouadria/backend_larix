const User=require('../models/UserModel')
const vm = require("v-response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ValidateUser =require('../validation/Users.validation')
const cloudinary = require("../utils/cloudinary");

   

const UserController={

        AddUser :async (req,res)=>{
            const {errors,isValid}=ValidateUser(req.body)
            const { username, email, password,cfPassword} = req.body;
      //   console.log({file:req.file});
            

        try {
            if (!isValid) {
                res.status(404).json(vm.ApiResponse(false,404,errors))
        
            }else{
             await   User.findOne({email:req.body.email}).then(async(exist)=>{
                    if ((exist)) {
                        errors.email="email already exist"
                        res.status(404).json(vm.ApiResponse(false,404,errors))
        
                    }
                    else{
                        if(password!==cfPassword)
                        return  res.status(404).json(vm.ApiResponse(false,404,"password is not matched"))
                       // 

        
                      const passwordHash = await bcrypt.hash(password, 12);
                      if (!req.file || req.file.path ==undefined || req.file.path ==null){
                        
                      var newUser = new User({
                        username:username,
                        email:email,
                        password:passwordHash,
                       
                     
                      })
                      
                        
                      }else{
                        const result = await cloudinary.uploader.upload(req.file.path);
                        var newUser = new User({
                          username:username,
                          email:email,
                          password:passwordHash,
                          image: result.secure_url,
                          cloudinary_id: result.public_id,
                       
                        })

                      }
                   
                     // console.log(passwordHash);
        
                     // console.log({newUser});
                      newUser
                      .save()
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
            res.status(500).json({"mmm":err})
            console.log({err});
            
        }
        
        },


        login: async (req, res) => {
            try {
              const { username, password } = req.body;
              const user = await User.findOne({ username });
              console.log({user})
              if (!user)
                return res.status(400).json({ msg: "username does not exist." });
          
              const isMatch = await bcrypt.compare(password, user.password);
              console.log(isMatch);
              if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });
          
              const refresh_token = createRefreshToken({ id: user._id });
              console.log({user});
          
          
              res.json({ msg: "Login success!", refresh_token: refresh_token ,user:user});
            } catch (err) {
              return res.status(500).json({ msg: err.message });
            }
          },

          alluser:async(req,res)=>{
            await User.find({}).then((user)=>{
                res.status(200).json({user})

            })



          },



          getprofile:async(req,res)=>{
              await User.find({_id:req.user.id}).then((user)=>{
                return res.status(200).json(vm.ApiResponse(true,200,user))
              })

          },

          updateUser:async(req,res)=>{
          /*  const id=req.params.id
            const {name,email,password}=req.body
            await User.findByIdAndUpdate({_id:id},{name:name,email:email,password:password}).then((user)=>{
              return res.status(200).json(vm.ApiResponse(true,200,"updated"+user))

              
            })*/
            try {
              let user = await User.findById(req.params.id);
              // Delete image from cloudinary
              console.log(user.cloudinary_id);
              await cloudinary.uploader.destroy(user.cloudinary_id);
              // Upload image to cloudinary
              const result = await cloudinary.uploader.upload(req.file.path);
              console.log({result});
              console.log(req.file.path);

              const data = {
                username: req.body.username || user.username,
                image: result.secure_url || user.image,
                cloudinary_id: result.public_id || user.cloudinary_id,
              };
              user = await User.findByIdAndUpdate(req.params.id, data, {
           new: true
           });
              res.json(user);
            } catch (err) {
              console.log(err);
            }
            

          }  ,
          deleteUser:async(req,res)=>{
            const id=req.params.id
            console.log({id});
       
            
              //  res.status(200).json(vm.ApiResponse(true,200,"employee deleted successfuly"))
              const user=   await User.findByIdAndDelete({_id:id})
              if (!user) {
              return res.status(404).json(vm.ApiResponse(true,404,"user not founded"))
              }
     
              try {
              
                  await User.findByIdAndDelete({_id:req.params.id}).exec((err,em)=>{
                  if (err) {
                    res.status(400).json(vm.ApiResponse(false,400,err))      

                  }else{
                    return res.status(200).json(vm.ApiResponse(true,200,"employee deleted successfuly"))

                  }

                })
                    } catch (error) {
                console.log( error.message)
                return res.status(500).json(vm.ApiResponse(true,500,"server error"))
            }

            
            
          }
        

          

    }


    
    const createRefreshToken = (payload) => {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "7d",
        });
  
  
     
      };
  




module.exports=UserController


