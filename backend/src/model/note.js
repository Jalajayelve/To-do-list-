import mongoose from "mongoose";
//create a schema 
// model based off of that schema 

const notesSchema = new mongoose.Schema ({

    title:{
     type:String,
     required:true,
    },
    content:{
        type:String,
        required:true,
    },
},
{timestamps:true} //createdAT, updatedat
   
);

const Note = mongoose.model("Note", notesSchema)

export default Note;
