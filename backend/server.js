const { config } = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");

const app = express();

//middleware
app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.body, req.path , req.method)
    next()
})

//routes

//connect to mongo db
mongoose.connect(process.env.dbURI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Connected to SACCO DB",process.env.PORT);
        })
    })
    .catch((error)=>{
        console.log(error);
    })

