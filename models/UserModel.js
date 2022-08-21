const mongoose = require('mongoose');
const baseOption={
    discriminatorKey:'role',
    collection:'User'

};
const userSchema = new mongoose.Schema({
    image:{
        type: String,
        default:'https://res.cloudinary.com/dnc2y4ue8/image/upload/v1660493713/blank-profile-picture-973460_1280_tyqijf.webp'


    },
    username: {
        type: String,
        required: [true, "Please enter your username!"],
        trim: true
    },
    first: {
        type: String,
        // required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
   
    /*role: {
        type: String,
        enum: ['employee', 'admin',"client"],
        default: 'employee'
    },*/
    cloudinary_id: {
        type: String,
       // default:"v1660493713"
      },
   
  
}, baseOption,{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)