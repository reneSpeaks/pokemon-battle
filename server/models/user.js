import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

export default model('User', userSchema);


