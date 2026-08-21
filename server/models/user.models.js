import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {

        username:{
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: [true, "password is required"],
            trim: true,

        },
        
        role:{
            type: String,
            enum: ["employee", "projectManager", "admin"],
            default: "admin"
        },

        refreshToken: {
            type: String
        }   


  }
,{timestamps:true})

export const User = mongoose.model("User",userSchema)