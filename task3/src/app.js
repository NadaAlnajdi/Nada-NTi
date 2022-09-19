const express = require("express")
const hbs = require("hbs")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname,"../frontend/static")))
app.set("view engine", 'hbs')
app.set("views", path.join(__dirname, "../frontend/views"))
hbs.registerPartials( path.join(__dirname, "../frontend/layout"))

app.use(express.urlencoded({extended:true}))

const tasksRoutes = require("../routes/tasks.routes")
app.use(tasksRoutes)
module.exports=app
