import mongoose,{Schema} from 'mongoose'


const projectSchema = new Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },

    description:{
        type:String,
        required:true,
    },

    status:{
        type:String,
        enum:["started", "In progress", "completed"],
        default:"started"
    },

    startDate:{
        type:Date,
        required:true
    },

    endDate:{
        type:Date,
        required:true
    },

    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"low"
    }


},{timestamps:true})

export const Project = mongoose.model("Project",projectSchema)

