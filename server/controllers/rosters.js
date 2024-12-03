import Roster from "../models/roster.js";

export const getRosters = async (req, res) => {
    try {
        const rosters = await Roster.find({});
        res.status(200).json(rosters);
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
