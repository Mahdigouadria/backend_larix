const userModel=require('./UserModel')
const mongoose = require('mongoose'); 
// Declare the Schema of the Mongo model
var ClientSchema = new mongoose.Schema({


    company_name:{
        type:String,
        required:true,
        trim:true,
    },

    billing_method:{
        type:String,
        required:true,
        trim:true,

    },

    mobile:{
        type:String,
        required:true,
        trim:true,
    },

    currency:{
        type:String,
        required:true,
        trim:true,
    },

    date : {
        type : Date,
        required : true 

    }




});


userModel.discriminator('Client',ClientSchema)
module.exports = mongoose.model('Client');