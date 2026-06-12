import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import dns from "node:dns"; // 1. Import the built-in DNS module

// 2. Set reliable DNS servers before making any network or database calls
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const app = express();
const server =createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    app.set("mongo_user")
     const connectionDb = await mongoose.connect("mongodb+srv://priyanshuranjan0129_db_user:Priyanshu1210@gathernet.wzmexi4.mongodb.net/?appName=gathernet")
     console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
     server.listen(app.get("port"), () =>{
         console.log("Listening on Port 8000")
    });
}

start();