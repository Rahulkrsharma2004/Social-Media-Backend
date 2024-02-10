const express = require("express")
const jwt = require("jsonwebtoken")
const { auth } = require("../Middleware/authMiddleware")
const { PostModel } = require("../Models/postModel")
const dotenv = require("dotenv").config()

const postRouter = express.Router()

postRouter.post("/add", auth, async (req, res) => {
    
    try {

        const post = new PostModel(req.body)
        await post.save()
        res.send({ "msg": "A new post has been created" })
    } catch (error) {
        res.send({ "error": error })
    }
})

postRouter.get("/", auth, async (req, res) => {
    
    try {
        
        const post = await PostModel.find()
        res.send(post)

    } catch (error) {
        res.send({ "error": error.message })
    }
})

postRouter.patch("/update/:postID", auth, async (req, res) => {
    const { postID } = req.params;
    try {
        const findUserID = req.body.userID
        const postUserID = await PostModel.findById({_id:postID})
        if(postUserID.userID != findUserID){
            return res.status(400).send({"msg":"you are not authorized"})
        }

        await PostModel.findByIdAndUpdate({ _id: postID }, req.body)
        res.send(`post has been updated with ID: ${postID}`)
    } catch (error) {
        res.send({ "error": error.message })
    }
})

postRouter.delete("/delete/:postID", auth, async (req, res) => {
    const { postID } = req.params
    try {
        const findUserID = req.body.userID
        const postUserID = await PostModel.findById({_id:postID})
        if(postUserID.userID != findUserID){
            return res.status(400).send({"msg":"you are not authorized"})
        }

        await PostModel.findByIdAndDelete({ _id: postID }, req.body)
        res.send(`Post has been delete with ID: ${postID}`)
    } catch (error) {
        res.send({ "error": error })
    }
})

module.exports = { postRouter }

