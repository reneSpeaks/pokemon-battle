
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from './server/models/user.js'; 
import bcrypt from 'bcryptjs';



// MongoDB connection URL
const dbUrl = process.env.MONGO_URI;


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};



// Array of sample users to seed the database with
const sampleUsers = [
    {
        firstName: "Azadeh",
        lastName: "keshavarzjoud",
        username: "azadeh_joud",
        password: "azadeh"
    },
    {
        firstName: "Rena",
        lastName: "Weiberlenn",
        username: "rene_Weiberlenn",
        password: "rene"
    },
    {
        firstName: "Ash",
        lastName: "Ketchum",
        username: "ash_ketchum",
        password: "pikachu123"
    },
    {
        firstName: "Misty",
        lastName: "Waterflower",
        username: "misty",
        password: "watermaster"
    },
    {
        firstName: "Brock",
        lastName: "Harrison",
        username: "brock_rock",
        password: "onix123"
    },
    {
        firstName: "Gary",
        lastName: "Oak",
        username: "gary_oak",
        password: "professor123"
    }
];


const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Delete existing users before seeding new ones (optional)
        await User.deleteMany({});
        console.log('Existing users removed');

        // Hash passwords before inserting
        for (const user of sampleUsers) {
            user.password = await hashPassword(user.password);
        }
        // Insert sample users
        await User.insertMany(sampleUsers);
        console.log('Users seeded successfully');

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};



seedDatabase();