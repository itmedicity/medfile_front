/***
 * 1st method
 * 
 */


import axios from "axios";

// Base Axios instance
const api = axios.create({
    baseURL: "https://your-api-url.com", // Replace with your backend API URL
    withCredentials: true, // Ensures cookies are sent with requests
});

// Add a request interceptor to attach the access token to every request
api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration and refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite retries

            try {
                // Refresh the token
                const { data } = await axios.post(
                    "https://your-api-url.com/refresh",
                    {}, // No payload, refresh token is sent automatically via HTTP-only cookies
                    { withCredentials: true } // Ensure cookies are sent
                );

                // Store the new access token
                localStorage.setItem("accessToken", data.accessToken);

                // Retry the original request with the new token
                originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                // Handle logout or redirection to login page
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;




import api from "./api";

const login = async (credentials) => {
    try {
        const { data } = await api.post("/login", credentials);
        localStorage.setItem("accessToken", data.accessToken);
        console.log("Logged in successfully!");
    } catch (error) {
        console.error("Login failed:", error);
    }
};


const fetchProtectedData = async () => {
    try {
        const response = await api.get("/protected-data");
        console.log("Protected data:", response.data);
    } catch (error) {
        console.error("Failed to fetch protected data:", error);
    }
};



const logout = async () => {
    try {
        await api.post("/logout");
        localStorage.removeItem("accessToken");
        console.log("Logged out successfully!");
    } catch (error) {
        console.error("Logout failed:", error);
    }
};





/****
 * 
 * Security Best Practices
Use HTTP-only cookies for the refresh token:

This protects the token from JavaScript-based attacks (e.g., XSS).
Short lifespan for access tokens:

Access tokens should be short-lived (e.g., 15 minutes).
Use the refresh token to obtain new access tokens.
Secure cookies:

Use Secure, HttpOnly, and SameSite=Strict or Lax for cookies.
Logout mechanism:

Ensure refresh tokens can be invalidated on the backend during logout.
This approach ensures a secure and seamless user experience with token-based authentication in your React app.
 * 
 * 
 * 
 */



/*****
 * 
 * 2nd method
 */



/***
 * 
 * 
 * and i want socket.io needed to block multiple user login from multiple client
 */



/****
 * 
 * 
 * 
 * back end
 */


const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000", // Replace with your frontend's URL
        credentials: true,
    },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// Mock user data (replace with a database in production)
const users = [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" },
];

// Store active users and their connected sockets
const activeUsers = {}; // { userId: socketId }

// Utility Functions
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
        expiresIn: "7d",
    });
};

// In-memory store for refresh tokens
let refreshTokens = [];

// Routes

// Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.push(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });

    res.json({ accessToken, userId: user.id });
});

// Refresh Token Route
app.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken({ id: user.id, username: user.username });
        res.json({ accessToken: newAccessToken });
    });
});

// Logout Route
app.post("/logout", (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
});

// Socket.IO Integration
io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("login", ({ userId }) => {
        if (activeUsers[userId]) {
            // Disconnect previous client if the user is already logged in
            const previousSocket = activeUsers[userId];
            previousSocket.emit("multiple-login", "You have been logged out due to login from another device.");
            previousSocket.disconnect();
        }

        // Store the current user and socket
        activeUsers[userId] = socket;

        console.log(`User ${userId} logged in with socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
        // Remove the user from active users on disconnection
        for (const [userId, userSocket] of Object.entries(activeUsers)) {
            if (userSocket.id === socket.id) {
                delete activeUsers[userId];
                console.log(`User ${userId} disconnected`);
            }
        }
    });
});

// Protected Route
app.get("/protected-data", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        res.json({ message: "This is protected data", user });
    });
});

// Start Server
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



/****
 * 
 * Explanation of the Socket.IO Integration
Active User Tracking:

A userId is mapped to a socketId in the activeUsers object.
When a new login happens, the server checks if the user already has an active socket.
Disconnecting Existing Clients:

If the user is already logged in (exists in activeUsers), the server disconnects the previous client and sends them a message.
Socket Events:

login: Triggered when a user logs in via Socket.IO. It associates the user's userId with the current socketId.
disconnect: Removes the user from the activeUsers list when the socket disconnects.
Frontend Handling:

The client should listen for the multiple-login event and redirect the user to the login page if triggered.

 * 
 */


/****
 * 
 * Step 3: Frontend Integration with Socket.IO
Install Socket.IO Client:

bash
Copy code
npm install socket.io-client
Example code for the frontend:
 * 
 * 
 */

import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

// On login
socket.emit("login", { userId: loggedInUserId });

// Listen for multiple-login event
socket.on("multiple-login", (message) => {
    alert(message);
    // Redirect to login page
    window.location.href = "/login";
});