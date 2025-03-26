import { Schema,model } from "mongoose";

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
    phone:String,
    role:{
        type: String,
        enum:["admin" , "teacher"],
        default:"customer"
    },status:{
        type:String,
        enum:["active", "restricted", "banned"],
        default:"active"
    },
    status: { type: String, enum: ["active", "restricted" , "panned"], default: "active" },
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
export const userModel = model("AuthUser", userSchema);