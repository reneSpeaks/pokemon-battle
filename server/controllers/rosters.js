import Roster from "../models/roster.js";
import mongoose from "mongoose";

/**
 * Get all rosters
 */
export const getRosters = async (req, res) => {
  try {
    const rosters = await Roster.find().populate("userId", "username firstName lastName");
    res.status(200).json(rosters);
  } catch (error) {
    console.error("Error fetching rosters:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Get a roster by ID
 */
export const getRoster = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid roster ID format" });
    }

    const roster = await Roster.findById(id).populate("userId", "username firstName lastName");

    if (!roster) {
      return res.status(404).json({ message: "Roster not found" });
    }

    res.status(200).json(roster);
  } catch (error) {
    console.error("Error fetching roster:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Get a roster by userId
 */
export const getRosterByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const roster = await Roster.findOne({ userId }).populate("userId", "username firstName lastName");

    if (!roster) {
      return res.status(404).json({ message: "Roster not found for the given user" });
    }

    res.status(200).json(roster);
  } catch (error) {
    console.error("Error fetching roster by userId:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Create a new roster
 */
export const createRoster = async (req, res) => {
  try {
    const { userId, pokemonIds } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    if (!Array.isArray(pokemonIds) || !pokemonIds.every((pokemon) => typeof pokemon.id === "number")) {
      return res.status(400).json({ message: "pokemonIds must be an array of objects with numeric 'id' properties" });
    }

    const roster = await Roster.create({ userId, pokemonIds });
    res.status(201).json(roster);
  } catch (error) {
    console.error("Error creating roster:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Update a roster by ID
 */
export const updateRoster = async (req, res) => {
  try {
    const { id } = req.params;
    const { pokemonIds } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid roster ID format" });
    }

    if (!Array.isArray(pokemonIds) || !pokemonIds.every((pokemon) => typeof pokemon.id === "number")) {
      return res.status(400).json({ message: "pokemonIds must be an array of objects with numeric 'id' properties" });
    }

    const updatedRoster = await Roster.findByIdAndUpdate(
      id,
      { pokemonIds },
      { new: true }
    );

    if (!updatedRoster) {
      return res.status(404).json({ message: "Roster not found" });
    }

    res.status(200).json(updatedRoster);
  } catch (error) {
    console.error("Error updating roster:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Delete a roster by ID
 */
export const deleteRoster = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid roster ID format" });
    }

    await Roster.findByIdAndDelete(id);
    res.status(204).json({ message: "Roster deleted successfully" });
  } catch (error) {
    console.error("Error deleting roster:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Update a roster by userId (replace Pokémon IDs)
 */
export const updateRosterByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { pokemonIds } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    if (!Array.isArray(pokemonIds) || !pokemonIds.every((pokemon) => typeof pokemon.id === "number")) {
      return res.status(400).json({ message: "pokemonIds must be an array of objects with numeric 'id' properties" });
    }

    const updatedRoster = await Roster.findOneAndUpdate(
      { userId },
      { pokemonIds },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedRoster);
  } catch (error) {
    console.error("Error updating roster by userId:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


      
