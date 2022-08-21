const userModel=require('./UserModel')
const mongoose = require('mongoose'); 
// Declare the Schema of the Mongo model
var EmployeeSchema = new mongoose.Schema({

    position:{
        type:String,
        trim:true,

    },

    dob:{
        type:Date,
        required:true,
        max:Date.now()
    },

    department:{
       type:String,
       required:true,
       trim:true,

    },

    mobile:{
        type:String,
        required:true,
        trim:true,
    },

    education:{
            type:String,
            required:true,
            trim:true,
    },

    adresse:{
        type:String
    },

    gender:{
        type:String,
        required:true
    },

    last:{
        type:String,
        trim : true

    },




});


userModel.discriminator('Employee',EmployeeSchema)
module.exports = mongoose.model('Employee');