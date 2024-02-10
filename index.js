const express = require("express")
const dotenv = require("dotenv").config()
const { connection } = require("./db")
const {userRouter} = require("./Routes/userRoute")
const {postRouter} = require("./Routes/postRoute")
const jwt = require("jsonwebtoken")
const app = express()
const PORT = process.env.PORT
const cors = require("cors")


app.use(express.json())

app.use(cors({
    origin:["https://full-stack-backend-beyu.onrender.com"], 
    credentials:true,
}))

app.use("/users", userRouter)
app.use("/posts", postRouter)

app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Express server running on port ${PORT} and db is also connected`)

    } catch (error) {
        console.log(error)
    }

})