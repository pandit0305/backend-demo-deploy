const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const {userModel} = require("../model/user.model");
//import json web token
const jwt = require("jsonwebtoken");

userRouter.get("/", (req, res)=>{
    res.send("<h1>WelCome</h1>");
})

userRouter.post("/signup", async(req, res)=>{
    const {Email, Password, Name} = req.body;
    
    try{
        const userPresent = await userModel.findOne({Email});
        if(userPresent){
            res.send("Already registered")
        }else{
            bcrypt.hash(Password, 5, async function(err, hash){
                const userDetails = new userModel({Name, Email, Password:hash});
                await userDetails.save();
                console.log("data is added");
                res.send("signup successful");
            }) 
        }

    }catch(err){
        res.status(400).send({message: err.message});
        console.log("data adding failed");
    }
})

userRouter.post("/login", async(req, res)=>{
    const {Email, Password}  = req.body;
    try{
        const user = await userModel.find({Email});
        const hashed_password = user[0].Password;

        if(user.length > 0){
            bcrypt.compare(Password, hashed_password, function(err, result) {
                // result == true
                if(result){
                    const token = jwt.sign({"userId" : user[0]._id},"shhh");
                    res.send({"message":"login successful ","token":`${token}`});
                }else{
                    res.send("login failed")
                }
            });
        }else{
            res.send("login failed");
        }

    }catch(err){
        res.status(400).send({message: err.message});
        console.log("data adding failed");
    }
})

module.exports ={userRouter};