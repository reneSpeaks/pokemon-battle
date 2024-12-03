import Leaderboard from "../models/leaderboard.js";

export const getLeaderboards = async (req, res) => {
    try {
        const leaderboards = await Leaderboard.find({});
        res.status(200).json(leaderboards);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getLeaderboard = async (req, res) => {
    try {
        const { id } = req.params;

        
        const leaderboard = await Leaderboard.findById(id);
        res.status(200).json(leaderboard);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const createLeaderboard = async (req, res) => {
    try {
        const { userId, battlesWon, battlesLost, battlesDraw,score } = req.body;
        const leaderboard = await Leaderboard.create({ userId, battlesWon, battlesLost, battlesDraw,score });
        res.status(201).json(leaderboard);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateLeaderboard = async (req, res) => {
    try {
        const {
            params: { id },
            body,
        } = req;

        const leaderboard = await Leaderboard.findByIdAndUpdate(id, body, { new: true });

        res.status(200).json(leaderboard);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteLeaderboard = async (req, res) => {
    try {
        const { id } = req.params;
        await Leaderboard.findByIdAndDelete(id);
        res.status(204).json({ message: "Leaderboard deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
