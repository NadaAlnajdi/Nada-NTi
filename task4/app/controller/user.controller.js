const userModel = require("../../database/models/user.model")
class User {

 static register = async(req,res)=>{
    try{
  const user = new userModel(req.body)
  await user.save()
  res.status(200).send({
    apiStatus: true,
    date: user,
    message: "User Added Successfully"
})
}
catch (e) {
res.status(500).send({
    apiStatus: false,
    date: e,
    message: e.message
})
}
 }

 static getAll = async(req,res)=>{
    try{
  const users = await userModel.find()
  
  res.status(200).send({
    apiStatus: true,
    date: user,
    message: "all Users Fetched successfully"
})
}
catch (e) {
res.status(500).send({
    apiStatus: false,
    date: e,
    message: e.message
})
}
 }

 static getSingle = async(req,res)=>{
    try{
  const user = await userModel.findById(req.params.id)
  
  res.status(200).send({
    apiStatus: true,
    date: user,
    message: "This User Fetched successfully"
})
}
catch (e) {
res.status(500).send({
    apiStatus: false,
    date: e,
    message: e.message
})
}
 }

 static delete = async(req,res)=>{
    try{
  const users = await userModel.deleteMany()
  
  res.send({
    apiStatus:true, data:[] , message:"data deleted successfuly"
  })
    }
    catch(e){
   res.send({
    apiStatus:false, data: e.message , message:"error deleting user"

   })
    }
 }

 static deleteOne = async (req, res) => {
  try {
      const data = await userModel.findByIdAndDelete(req.params.id)
      res.status(200).send({
          apiStatus: true,
          date: data,
          message: "This User Deleted successfully"
      })
  }
  catch (e) {
      res.status(500).send({
          apiStatus: false,
          date: e,
          message: e.message
      })
  }

}

static edit = async (req, res) => {
  try {
      const myUpdates = Object.keys(req.body)
      const allowedEdits = ["name", "age"]
      const validEdits = myUpdates.every(
          (update) => allowedEdits.includes(update)
      )
      if (!validEdits) throw new Error("Invalid Edits")
      const user = await userModel.findById(req.params.id)
      if (!user) throw new Error("Invalid Id")
      myUpdates.forEach(update => user[update] = req.body[update])
      res.status(200).send({
          apiStatus: true,
          date: user,
          message: "This User Edited successfully"
      })
  }
  catch (e) {
      res.status(500).send({
          apiStatus: false,
          date: e,
          message: e.message
      })
  }
}

 static login = async (req, res) => {
  try {
      const userData = await userModel.login(req.body.email, req.body.password)
      const token = await userData.generateToken()
      res.status(200).send({apiStatus: true, date: { userData, token },message: "Logged In"})
  }
  catch (e) {
      res.status(500).send({apiStatus: false , date: e , message :"error"})
  }
}
static logout = async (req, res) => {
  try {
      req.user.tokens = req.tokens.filter(t => t.token != req.token)
      await req.user.save()
      res.status(200).send({apiStatus: true,message: "done",date: req.user})
  }
  catch (e) {
      res.status(500).send({ apiStatus: false,  date: e,message: e.message, })
  }
}
static logoutAll = async (req, res) => {
  try {
      req.user.tokens = []
      await req.user.save()
      res.status(200).send({apiStatus: true,date: req.user,message: e.message,})
  }
  catch (e) {
      res.status(500).send({apiStatus: false, data: e,message: e.message})
  }
}

static editPass = async (req, res) => {
  try {
      const user = await userModel.findById({ "_id": req.params.id })
      user.password = req.body.password
      res.status(200).send({
          apiStatus: true,
          date: user,
          message: "Password Edited Successfully"
      })
  }
  catch (e) {
      res.status(500).send({
          apiStatus: false,
          date: e,
          message: e.message
      })
  }

}


static activate = async(req,res)=>{
  try{
      req.user.status=true
      await req.user.save()
      res.status(200).send({apiStatus:true,message:"Activated",data: req.user})    
  }
  catch(e){
      res.status(500).send({ apiStatus: false,data:e,message:e.message})
  }
}
static deActivate = async(req,res)=>{
  try{
      req.user.status=false
      await req.user.save()
      res.status(200).send({apiStatus:true,message:"DeActivated",data: req.user})    
  }
  catch(e){
      res.status(500).send({ 
          apiStatus: false,
          data:e,
          message:e.message
          
      })
  }
}

static editMyData = async (req, res) => {
  try {
      for (let single in req.body) {
          req.user[single] = req.body[single]
      }
      await req.user.save()
      res.status(200).send({ 
          apiStatus: true,
          date: req.user,
          message: "Your Data Edited Successfully"
      })
  }
  catch(e){
      res.status(500).send({ 
          apiStatus: false, 
          date: e,
          message: e.message
      })
  }
}

}

module.exports=User