const express = require("express")
const dotenv = require("dotenv").config()
const { connection } = require("./db")
const {userRouter} = require("./Routes/userRoute")
const {postRouter} = require("./Routes/postRoute")
const jwt = require("jsonwebtoken")
const app = express()
const PORT = process.env.PORT
const cors = require("cors")
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["https://elegant-toga-moth.cyclic.app"], 
    credentials:true,
}))

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.get("/",(req,res)=>{
    res.status(200).send('This is The Home Page')
})

app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Express server running on port ${PORT} and db is also connected`)

    } catch (error) {
        console.log(error)
    }

})