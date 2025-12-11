const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')

const userScehma= new mongoose.Schema({
    username: {type: String, required: true },
    email: {type: String, required: true,unique:true }, //npm i --save mongoose-unique-validator
    password: {type: String, required: true },
    admin: {type: Boolean, required: true },
})

// userScehma.plugin(uniqueValidator)

module.exports=mongoose.model("User",userScehma)