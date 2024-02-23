const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config()

const access_secretKey = process.env.ACCESS_SECRET_KEY
const refresh_secretKey = process.env.REFRESH_SECRET_KEY

const auth = async (req, res, next) => {
    const token = req.cookies.token
    console.log("token",token)
    // const refresh_token = req.cookies.REFRESH_TOKEN
    // const token = req.headers.authorization

    try {

        // if (await BlacklistToken.findOne({ token })) {
        // throw new Error( "Please login again" )
        // } 

        jwt.verify(token, access_secretKey, (err, decode) => {
            if (decode) {
                req.body.userID = decode.userID
                req.body.user = decode.user
                next()
    
            } else {
                jwt.verify(token, refresh_secretKey, (err, decode) => {
                    const cookieOptions={httpOnly:true,secure:true,sameSite:"none"}
                    if (decode) {
                        const token = jwt.sign({userID:decode._id,user:decode.name}, access_secretKey, { expiresIn: "1h" })
                        res.cookie("ACCESS_TOKEN", token,cookieOptions)
                        next()
                    } else {
                        console.log("line 33")
                        res.status(400).send({ "msg": "Now you need to login again" })
                    }
                })
                res.status(400).send({ "error": err })
            }
        });
    }
     catch (error) {
      res.status(400).send({"error":error.message})  
      console.log(error)
    }
       
}

module.exports = {
    auth
}