import mongoose, {Schema} from 'mongoose'

const taskSchema = new Schema({

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
    },
    asingTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    

},{timestamps:true})

export const Task = mongoose.model("Task",taskSchema)