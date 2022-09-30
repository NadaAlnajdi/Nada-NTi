const mongoose = require("mongoose")
const postSchema = mongoose.Schema({
    postType:{
        type:String,
        enum:["file" , "txt"]
    },
    txt:{
        type:String,
        trim:true,
        required: function(){
            return this.postType=="txt"
        }
    },
    content:{
        type:String,
        trim:true,
        required: function(){
            return this.postType!=="txt"
        }
    }
})

const post = mongoose.model(postSchema)
module.exports=post