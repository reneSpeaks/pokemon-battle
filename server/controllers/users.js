import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        // const user = await User.findOne({ _id: id });
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        const user = await User.create({ firstName, lastName, username, password });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const {
            params: { id },
            body,
        } = req;

        const user = await User.findByIdAndUpdate(id, body, { new: true });

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
