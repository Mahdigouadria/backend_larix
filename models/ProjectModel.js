//const moment = require("moment");
const mongoose = require("mongoose");


const  ProjectSchema = new mongoose.Schema({


    projectTitle: {
        type: String, 
        required: [true, "Please write a title for your event"]
    },

    startDate: {
     type: Date,
     required: [true, "Please Insert The Start of your event" ],
     min: [new Date(), "can't be before now!!"],
    },

    endDate: {
     type: Date,
     //setting a min function to accept any date one hour ahead of start
     min: [function(){
       const date = new Date(this.startDate)
       const validDate = new Date(date.setHours(date.getHours()+1)) 
       return validDate
     },"Event End must be at least one hour a head of event time"],
    default: function(){
      const date = new Date(this.startDate)
      return date.setDate(date.getDate()+1)
    },
    },

    department: { 
        type: String,
        required :true
    },
    
    priority: {
        type: String,
        required :true
    },

    status: {
        type: String,
        required :true
    },


    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true 
    }, 

    team:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'Employee',
        required: true 
    },

    /*projectID: {
        type: String,
        required :true
    },*/

    /*fileUpload:{
        type : true
    }*/




    
    






    
})


module.exports = mongoose.model("Project", ProjectSchema)