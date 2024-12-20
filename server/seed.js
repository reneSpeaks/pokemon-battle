import mongoose from 'mongoose';
import User from './models/user.js';
import Roster from './models/roster.js';
import Leaderboard from './models/leaderboard.js';
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
    username: "azadeh",
    password: "password",
  },
  {
    firstName: "Rene",
    lastName: "Weiberlenn",
    username: "rene",
    password: "password",
  },
  {
    firstName: "Ash",
    lastName: "Ketchum",
    username: "ash_ketchum",
    password: "pikachu123",
  },
  {
    firstName: "Misty",
    lastName: "Waterflower",
    username: "misty",
    password: "watermaster",
  },
  {
    firstName: "Brock",
    lastName: "Harrison",
    username: "brock_rock",
    password: "onix123",
  },
  {
    firstName: "Gary",
    lastName: "Oak",
    username: "gary_oak",
    password: "professor123",
  },
];

// Array of sample Rosters to seed the database with
// Find users to associate with rosters
// const userAsh = await User.find({ username: "ash_ketchum" });
// const userMisty = await User.find({ username: "misty" });
// const userBrock = await User.find({ username: "brock_rock" });
//
// const sampleRosters = [
//   {
//     userId: userAsh._id,
//     pokemonIds: [{ id: 25 }, { id: 6 }, { id: 130 }],
//   },
//   {
//     userId: userMisty._id,
//     pokemonIds: [{ id: 121 }, { id: 54 }, { id: 118 }],
//   },
//   {
//     userId: userBrock._id,
//     pokemonIds: [{ id: 95 }, { id: 74 }, { id: 111 }],
//   },
// ];

// Array of sample Leaderboards to seed the database with
const sampleLeaderboard = [
  {
    username: "ash_ketchum",
    battlesWon: 10,
    battlesLost: 5,
    battlesDraw: 1,
    score: 1000,
  },
  {
    username: "misty",
    battlesWon: 8,
    battlesLost: 6,
    battlesDraw: 2,
    score: 800,
  },
  {
    username: "brock_rock",
    battlesWon: 6,
    battlesLost: 4,
    battlesDraw: 0,
    score: 600,
  },
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
    // const rostersToInsert = sampleRosters.map((roster) => ({
    //   userId: userMap[roster.username],
    //   pokemonIds: roster.pokemonIds,
    // }));
    // await Roster.insertMany(rostersToInsert);
    console.log("Rosters seeded successfully");

    // Seed leaderboard
    const leaderboardToInsert = sampleLeaderboard.map((entry) => ({
      userId: userMap[entry.username],
      battlesWon: entry.battlesWon,
      battlesLost: entry.battlesLost,
      battlesDraw: entry.battlesDraw,
      score: entry.score,
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

void seedDatabase();