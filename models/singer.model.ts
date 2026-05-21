import mongoose from "mongoose";
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const singerSchema = new mongoose.Schema({
    fullname: String,
    avatar: String,
    status: String,
    slug: {
        type: String,
        slug: "fullname",
        unique: true
    },
    deleted: { 
        type: Boolean, 
        default: false 
    },
    deletedAt: Date
},{ timestamps: true });

const Singer = mongoose.model('Singer', singerSchema, "singers");
export default Singer;