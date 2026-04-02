import mongoose  from "mongoose";

const noteSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
},{ timestamps: true})

const Note = new mongoose.model("Note",noteSchema)

export default Note