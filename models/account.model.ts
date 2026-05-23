import mongoose from "mongoose";
import { generateRandomString } from "../helpers/generate";

const accountSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    token: { 
        type: String, 
        default: () => generateRandomString(20) 
    },
    role_id: String,
    phone: String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    deleted: { 
        type: Boolean, 
        default: false 
    },
    deletedAt: Date,
},{ timestamps: true });

const Account = mongoose.model('Account', accountSchema, "accounts");
export default Account;