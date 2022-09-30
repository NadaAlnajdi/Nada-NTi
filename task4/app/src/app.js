
require('dotenv').config()
require('../../database/connection')
const express = require("express")
const app = express()
const path = require("path")



const sataticDir = path.join(__dirname, "../public")
app.use(express.static(sataticDir))

app.use(express.urlencoded({extended:true}))
app.use(express.json())


const userRoutes = require("../../routes/user.routs")
app.use('/api/user',userRoutes)
app.get("*",(req,res)=>res.send({error:"invalid"}))

 
module.exports = app 