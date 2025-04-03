import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },

    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please find a valid email address']
    },

    password: {
        type: String, 
        required: [true, 'User password is required'],
        minLength: 6
    }
}, {timestamps: true});          // to keep track when created at / updated at 

// lets create model of this schema
const User = mongoose.model('User', userSchema); // 'User' is used internally by mongodb for database collection

export default User;