import Roster from "../models/roster.js";
import mongoose from "mongoose"; 
export const getRosters = async (req, res) => {
    try {
        const rosters = await Roster.find({});
        res.status(200).json(rosters);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};



export const createRoster = async (req, res) => {
    try {
        const { userId, pokemonIds } = req.body;
        const roster = await Roster.create({ userId, pokemonIds});
        res.status(201).json(roster);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateRoster = async (req, res) => {
    try {
        const {
            params: { id },
            body,
        } = req;

        const roster = await Roster.findByIdAndUpdate(id, body, { new: true });

        res.status(200).json(roster);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteRoster = async (req, res) => {
    try {
        const { id } = req.params;
        await Roster.findByIdAndDelete(id);
        res.status(204).json({ message: "roster deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const getRoster = async (req, res) => {
    try {
        const { id } = req.params;

   
        const roster = await Roster.findById(id);
       
        res.status(200).json(roster);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getRosterByUserId = async (req, res) => {
    const { userId } = req.params;
    console.log('Request params:', req.params);
    console.log('Fetching roster for userId:', userId);
    try {
        console.log('Fetching roster for userId:', userId); // Debug log

        // Find the roster for the given user ID
        const roster = await Roster.findOne({ userId }).populate('userId', 'username');
        console.log('Database query executed. Result:', roster);

        if (!roster) {
            console.log('No roster found for userId:', userId);
            return res.status(404).json({ error: 'Roster not found for the given user.' });
        }

        console.log('Roster fetched successfully:', roster);

        // Respond with the full roster
        res.status(200).json({
            userId: roster.userId._id,
            username: roster.userId.username,
            pokemonIds: roster.pokemonIds,
        });
    } catch (error) {
        console.error('Error fetching roster:', error);
        res.status(500).json({ error: 'Failed to fetch roster. Please try again later.' });
    }
};



    // Here’s the update function that updates a user's roster with new Pokémon and returns the updated roster in the response.
    //  The function will:
    // Accept a userId in the request parameters.
    // Accept an array of Pokémon IDs in the request body.
    // Update the roster associated with the given userId by adding the new Pokémon.
    // Return the updated roster in the response.
    export const updateRosterByUserId = async (req, res) => {
      try {
        const { userId } = req.params; // Extract userId from params
        const { pokemonIds } = req.body; // Extract new Pokémon IDs from body
    
        console.log("Received userId:", userId);
        console.log("Received pokemonIds:", pokemonIds);
    
        // Validate the userId as a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid userId format" });
        }
    
        // Validate pokemonIds
        if (!Array.isArray(pokemonIds)) {
          return res.status(400).json({ message: "pokemonIds must be an array" });
        }
    
        console.log("Updating roster for userId:", userId);
    
        // Find or create a roster for the user
        let roster = await Roster.findOne({ userId });
    
        if (!roster) {
          // If no roster exists, create a new one
          roster = new Roster({ userId, pokemonIds });
        } else {
          // Merge existing and new Pokémon, removing duplicates
          roster.pokemonIds = [...new Set([...roster.pokemonIds, ...pokemonIds])];
        }
    
        // Save the updated roster
        const updatedRoster = await roster.save();
    
        // Respond with the updated roster
        res.status(200).json(updatedRoster);
      } catch (error) {
        console.error("Error updating roster for userId:", error);
        res.status(500).json({ message: "Error updating roster" });
      }
    };