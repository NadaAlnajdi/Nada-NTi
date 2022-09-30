const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name:{
        type:String,
         trim:true,
          required: true
    }, 
    age:{
        type:Number, 
        default:22
    }, 
    email:{
        type:String,
        trim:true,
        required: true,
        unique:true
    }, 
    address:{
        type:String,
         trim:true 
    }, 
    image:{
        type:String,
         trim:true
    }, 
    password:{
        type:String,
        trim:true,
        required: true
    }, 
    status:{
        type:Boolean,
        default:false
    },
    userType:{
        type:String,
        enum:["file" , "txt"]
    },
    txt:{
        type:String,
        trim:true,
        required: function(){
            return this.userType=="txt"
        }
    },
    content:{
        type:String,
        trim:true,
        required: function(){
        return this.userType!=="txt"
    }
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]
    
},
    {timestamps:true}
)
   
userSchema.methods.toJSON = function(){
    const userData = this.toObject()
    delete userData._v
    delete userData.tokens
    return userData
}
userSchema.pre("save" , async function(){
    const data = this
    if (data.isModified("password"))
    data.password = await bcrypt.hash(data.password, 10)
    
})
userSchema.statics.checkpass = async(user , oldPass) => {
    const isValid = await bcrypt.compare(oldPass , user.password)
    return isValid
}

userSchema.statics.login = async (email , password) =>{
    const userData = await User.findOne({email})
    if(!userData) throw new Error ("Invalid Email")
    const isValid = await bcrypt.compare(password , userData.password)
    if(!isValid) throw new Error ("Invalid Password")
    return userData
}

const jwt = require("jsonwebtoken")
userSchema.methods.generateToken = async function(){
    const user = this
    if(user.tokens.length==5) throw new Error("token Exdded")
    const token = jwt.sign({_id:user._id} , "g22")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const user = mongoose.model("user",userSchema)
module.exports=user