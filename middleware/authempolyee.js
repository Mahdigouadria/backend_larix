const Users = require('../models/UserModel')

const authemployee = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !== "Employee") 
            return res.status(500).json({msg: "employee resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authemployee