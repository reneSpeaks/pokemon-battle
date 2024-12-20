
import { Schema, model } from 'mongoose';

const rosterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // References the User model
      required: true,
    },
    pokemonIds: {
      type: [
        {
          id: { type: Number, required: true },
        },
      ],
      _id: false, // Prevent MongoDB from creating _id for each subdocument
    },
  },
  { timestamps: true }
);

export default model('Roster', rosterSchema);