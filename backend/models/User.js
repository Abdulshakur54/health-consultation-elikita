import {Schema, model} from "mongoose";
const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    fullName: {type: String, required: true},
    gender: {type: String, required: true},
    dob: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    medicalHistory: {type: Array, default: []},
    profilePic: {type: String, default: ""},
    profilePicId: String
}, {timestamps: true})

const User = model('User', userSchema)
export default User
