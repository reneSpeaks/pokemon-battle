import { Schema, model } from 'mongoose';

const rosterSchema = new Schema({
   
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true,
    },

    pokemonIds: {
        type: [Number], // Array of Pokemon IDs
        default: [],
    },
}, { timestamps: true });

export default model('Roster', rosterSchema);