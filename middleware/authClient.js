const Users = require('../models/UserModel')

const authClient = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !== "client") 
            return res.status(500).json({msg: "client resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authClient