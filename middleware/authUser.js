const Users = require('../models/UserModel')

const authemployee = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})
        console.log(user);

        next()
    } catch (err) {
        // console.log({err});
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authemployee