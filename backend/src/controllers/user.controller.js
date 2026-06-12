import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";


const login = async (req, res) => {
    const { username, password } = req.body;

    // Validate input fields
    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password are required" });
    }

    try {
        // FIX: Use findOne instead of find so it returns a single document or null
        const user = await User.findOne({ username });
        
        // Handle case where user does not exist in the database
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        // FIX: Added 'await' and corrected the inverted logic (!)
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate session token on successful login
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
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        // Hash the password before saving
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

export { login, register };