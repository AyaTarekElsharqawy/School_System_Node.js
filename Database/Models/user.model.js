import { Schema,model } from "mongoose";

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
    phone:String,
    role:{
        type: String,
        enum:["admin" , "teacher"],
        default:"teacher"
    },
    isConfirmed:
    {
        type:Boolean,
        default:false
    },
    walletBalance:Number
},{
        timestamps:true,
        versionKey:false
    })
export const userModel = model("users", userSchema);