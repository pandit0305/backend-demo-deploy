const express = require('express');
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080

const {connection} = require("./config/db");
const {userRouter} = require("./router/user.route");
const {noteRouter}  = require("./router/notes.route")
const {authenticate} = require("./middleware/authentication")
const app = express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use("/", userRouter);

app.use(authenticate);
app.use("/notes", noteRouter);

app.listen(PORT, async ()=>{
    try{
        await connection;
        console.log("connection successful!")
    }catch(err){
        console.log("connection failed")
    }

    console.log(`server listen on port ${process.env.PORT}`)
})