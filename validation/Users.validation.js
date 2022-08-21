const isEmpty=require('./isEmpty')
const validator=require('validator')


module.exports=function ValidateUser(data){
let errors={}
    data.email=!isEmpty(data.email) ? data.email: ""
    data.username=!isEmpty(data.username) ? data.username: ""
    data.passwoed=!isEmpty(data.password) ? data.password: ""


    if (validator.isEmpty(data.password)) {
        errors.password="password is required"
        
    }
    if (validator.isEmpty(data.email)) {
        errors.email="required email"
        
    }
    if (validator.isEmpty(data.username)) {
        errors.username="required username"
        
    }
 return {
        errors,
        isValid: isEmpty(errors)
    }


}
