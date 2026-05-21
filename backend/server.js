import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.name === "CastError") {
        return res.status(400).json({ message: `Invalid ID format for ${err.path}` });
    }
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);