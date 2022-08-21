const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    try {
      
        const token = req.header("Authorization")
        console.log({token});
        console.log({req})
       
        if (!token) return res.status(400).json({ msg: "Invalid Authentication." })
        else{

        const decode = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        req.user = decode

        next()
    }

        
    } catch (err) {

        return res.status(500).json({ msg: "auth err" + err.message })
    }
}

module.exports = auth