const express = require('express');
const app = express();
const dotenv=require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
cookieParser = require('cookie-parser');
ConnectionURL =  process.env.MONGODB_URL




app.use(cors());

app.use(express.json())
//app.use(cookieParser());

//app.use(express.urlencoded({ extended: false }))

app.use('/user',require('./Routers/UserRouter'))
app.use('/employee',require('./Routers/EmployeeRouter'))
app.use('/client',require('./Routers/ClientRouter'))
app.use('/project',require('./Routers/ProjectRouter'))



const URI =process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,

}, err => {
    if(err) {
    console.log("err connecting to MongoDB");
    }else{

        console.log("Connected to mongodb")

    }
})




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});


