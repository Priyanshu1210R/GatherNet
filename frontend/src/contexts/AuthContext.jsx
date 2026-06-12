import axios from "axios";
import httpStatus from "http-status";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext({});

// Ensure 'server' is defined. If it's breaking, hardcode your URL here temporarily to test.
const client = axios.create({
    baseURL: `${server}/api/v1/users` 
});

export const AuthProvider = ({ children }) => {
    // FIX: Initialize with a clean null state instead of consuming itself
    const [userData, setUserData] = useState(null);
    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });

            // Fallback check: if status isn't explicitly 201, handle it if it returned 200
            if (request.status === httpStatus.CREATED || request.status === httpStatus.OK) {
                return request.data.message || "Registration Successful!";
            }
        } catch (err) {
            throw err;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                setUserData(request.data.user); // Update context state with user info if returned
                router("/home");
            }
        } catch (err) {
            throw err;
        }
    };

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data;
        } catch (err) {
            throw err;
        }
    };

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request;
        } catch (e) {
            throw e;
        }
    };

    const data = {
        userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
