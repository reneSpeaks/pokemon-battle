import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

export default model('User', userSchema);


