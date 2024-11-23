/******
 * 
 * help me to write http only + jwt token + refresh token + axios interceptors for validate token for every request 
 * 
 */


require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000", // Replace with your frontend's URL
        credentials: true, // Allow cookies
    })
);

// Mock user data (replace with a database in production)
const users = [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" },
];

// Utility Functions
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "15m", // Short-lived access token
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
        expiresIn: "7d", // Long-lived refresh token
    });
};

// In-memory store for refresh tokens (replace with a database in production)
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

    // Send refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use Secure in production
        sameSite: "Strict",
    });

    res.json({ accessToken });
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
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



Here’s a guide to implementing the backend for JWT authentication with Node.js and Express, using HTTP - only cookies for refresh tokens.

    Step 1: Install Required Dependencies
Install the required npm packages:

bash
Copy code
npm install express jsonwebtoken cookie - parser dotenv cors
Step 2: Backend Code
Below is a basic implementation of the backend.

    File: server.js
javascript
Copy code
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000", // Replace with your frontend's URL
        credentials: true, // Allow cookies
    })
);

// Mock user data (replace with a database in production)
const users = [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" },
];

// Utility Functions
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "15m", // Short-lived access token
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
        expiresIn: "7d", // Long-lived refresh token
    });
};

// In-memory store for refresh tokens (replace with a database in production)
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

    // Send refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use Secure in production
        sameSite: "Strict",
    });

    res.json({ accessToken });
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
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


Step 3: Environment Variables
Create a.env file in your project root:

makefile
Copy code
PORT = 5000
JWT_SECRET = your_jwt_secret_key
REFRESH_SECRET = your_refresh_secret_key
NODE_ENV = development
Replace your_jwt_secret_key and your_refresh_secret_key with secure random keys.You can generate them using Node.js:

bash
Copy code
node - e "console.log(require('crypto').randomBytes(64).toString('hex'))"