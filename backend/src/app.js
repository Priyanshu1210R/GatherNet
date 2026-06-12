import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import dns from "node:dns";

// 1. Load environment variables as early as possible
import dotenv from "dotenv";
dotenv.config();

// 2. Set reliable DNS servers
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// 3. Use the PORT from environment variables, fallback to 8000
app.set("port", process.env.PORT || 8000); 

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    try {
        // 4. Use the MONGO_URI from your .env file
        const connectionDb = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
        
        server.listen(app.get("port"), () => {
            console.log(`Listening on Port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

start();
