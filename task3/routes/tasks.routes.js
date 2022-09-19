const  router = require('express').Router()
const tasksController = require("../controllers/tasks.controller")
router.get('/',tasksController.AllTasks )
router.get('/add',tasksController.addTasks )
router.post('/add',tasksController.addTaskslogic)
router.get('/delete/:id',tasksController.deletetask)
router.get('/change/:id',(req,res)=>{
    tasksController.changstatus(req.params.id)
    res.redirect("/")
})
router.get('/show/:id',(req,res)=>{
    tasktemp=tasksController.showsingle(req.params.id)
    res.render("show",{
        pageTitle:"Show",
        tasktemp
    })
})

module.exports = router

