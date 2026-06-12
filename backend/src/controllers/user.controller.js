import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password are required" });
    }

    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        let token = crypto.randomBytes(20).toString("hex");

        user.token = token;
        await user.save();

        return res.status(httpStatus.OK).json({ message: "Login Successful", token: token });

    } catch (error) {
        return res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
}

const register = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(httpStatus.CREATED).json({ message: "User Registered" });

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error creating user" });
    }
} 

// NEW: Added placeholder for addToHistory to satisfy the route import
const addToHistory = async (req, res) => {
    try {
        // Your logic to add meeting/search history to the user's database profile goes here
        return res.status(httpStatus.OK).json({ message: "History updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// NEW: Added placeholder for getUserHistory to satisfy the route import
const getUserHistory = async (req, res) => {
    try {
        // Your logic to fetch user history goes here
        return res.status(httpStatus.OK).json({ history: [] });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Updated exports to include the missing functions
export { login, register, addToHistory, getUserHistory };
