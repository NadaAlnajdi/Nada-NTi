const dealWithData=require("./helpers/dealWithData")
const AllTasks=(req,res)=>{
    const AllTasks =dealWithData.readFile("./models/data.json")
    res.render("all",
    {
        pageTitle : "all Tasks",
        AllTasks,
        isEmpty:AllTasks.length==0? true : false
    })
    }

const addTasks=(req,res)=>{
    if (req.query.name && req.query.title){
    const AllTasks =dealWithData.readFile("./models/data.json")
    AllTasks.push({
    id:Date.now(),    
    name: req.query.name,
    title:req.query.title,
    content:req.query.content,
    status:req.query.status

})
dealWithData.writeFile("./models/data.json",AllTasks)
return res.redirect("/")
    }

        res.render("add", {
            pageTitle:"add task" ,
           
         })
         }
    
const addTaskslogic = (req,res)=>{
    (req.body.status.toLowerCase()==="true")?req.body.status=true:req.body.status=false;
    const AllTasks =dealWithData.readFile("./models/data.json")
    AllTasks.push({
    id:Date.now(),    
    name: req.body.name,
    title:req.body.title,
    content:req.body.content,
    status:req.body.status 


})
dealWithData.writeFile("./models/data.json",AllTasks)
 res.redirect("/")
}    

const deletetask=(req,res)=>{
    let alltasks=[]
    let index=''
    try {
        alltasks=dealWithData.readFile("./models/data.json")
        index=alltasks.findIndex(data=>data.id==req.params.id)
        if(index!=-1){
            alltasks.splice(index,1)
            dealWithData.writeFile("./models/data.json",alltasks)
        }
    } catch (error) {
    }
    res.redirect("/")
}

const changstatus=(id)=>{
    let alltasks=[]
    let index=''
    try {
        alltasks=dealWithData.readFile("./models/data.json")
        index=alltasks.findIndex(data=>data.id==id)
        if(alltasks[index].status){
            alltasks[index].status=false
        }
        else{
            alltasks[index].status=true
        }
       dealWithData.writeFile("./models/data.json",alltasks)
    } catch (error) {
        
    }
}

const showsingle=(id)=>{
    let alltasks
    let task
    try {
        alltasks=dealWithData.readFile("./models/data.json")
        task=alltasks.find(data=>data.id==id)
    } catch (error) {
        task={}
    }
    return task
}

module.exports= {AllTasks , addTasks , addTaskslogic , deletetask , changstatus , showsingle}