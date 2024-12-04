
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from './server/models/user.js';
import Roster from './server/models/roster.js';
import Leaderboard from './server/models/leaderboard.js';
import bcrypt from 'bcryptjs';



// MongoDB connection URL
const dbUrl = process.env.MONGO_URI;
if (!dbUrl) {
    console.error("MONGO_URI is not defined in the .env file.");
    process.exit(1);
}

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
        firstName: "Rene",
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

// Array of sample Rosters to seed the database with
const sampleRosters = [
    {
        username: "ash_ketchum",
        pokemonIds: [25, 6, 130] // Pikachu, Charizard, Gyarados
    },
    {
        username: "misty",
        pokemonIds: [121, 54, 118] // Starmie, Psyduck, Goldeen
    },
    {
        username: "brock_rock",
        pokemonIds: [95, 74, 111] // Onix, Geodude, Rhyhorn
    }
];

// Array of sample Leaderboards to seed the database with
const sampleLeaderboard = [
    {
        username: "ash_ketchum",
        battlesWon: 10,
        battlesLost: 5,
        battlesDraw: 1,
        score: 1000
    },
    {
        username: "misty",
        battlesWon: 8,
        battlesLost: 6,
        battlesDraw: 2,
        score: 800
    },
    {
        username: "brock_rock",
        battlesWon: 6,
        battlesLost: 4,
        battlesDraw: 0,
        score: 600
    }
];





const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Clear previous data
        await User.deleteMany({});
        await Roster.deleteMany({});
        await Leaderboard.deleteMany({});
        console.log("Existing data removed");

        // Seed users
        for (const user of sampleUsers) {
            user.password = await hashPassword(user.password); // Hash passwords
        }
        const users = await User.insertMany(sampleUsers);
        console.log("Users seeded successfully");

        // Map usernames to user IDs
        const userMap = {};
        users.forEach((user) => {
            userMap[user.username] = user._id;
        });

        // Seed rosters
        const rostersToInsert = sampleRosters.map((roster) => ({
            userId: userMap[roster.username],
            pokemonIds: roster.pokemonIds
        }));
        await Roster.insertMany(rostersToInsert);
        console.log("Rosters seeded successfully");

        // Seed leaderboard
        const leaderboardToInsert = sampleLeaderboard.map((entry) => ({
            userId: userMap[entry.username],
            battlesWon: entry.battlesWon,
            battlesLost: entry.battlesLost,
            battlesDraw: entry.battlesDraw,
            score: entry.score
        }));
        await Leaderboard.insertMany(leaderboardToInsert);
        console.log("Leaderboard seeded successfully");

        // Close the MongoDB connection
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    }
};


seedDatabase();