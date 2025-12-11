const mongoose=require('mongoose')

const templateScehma= new mongoose.Schema({
    filename: {type: String, required: true },
    data: [],
})


module.exports=mongoose.model("Templates",templateScehma)