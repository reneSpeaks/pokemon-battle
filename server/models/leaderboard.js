import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true,
    },
    battlesWon: {
        type: Number,
        default: 0,
    },
    battlesLost: {
        type: Number,
        default: 0,
    },
    battlesDraw: {
        type: Number,
        default: 0,
    },
    score: {
        type: Number,
        default: 0, // Score can be updated with a custom calculation
    },
}, { timestamps: true });

export default model('Leaderboard', leaderboardSchema);