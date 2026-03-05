import express from "express";
import http from "http";
import dotenv from "dotenv";
import getSecondaryConnection from "./connections/mongo.connection.js";
import { createUser } from "./controllers/auth/auth.controller.js";

dotenv.config();

const initializeApp = async () => {
  const app = express();
  const server = http.createServer(app);

  try {

    // Basic middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Health check route
    app.get("/health", (req, res) => {
      res.status(200).json({
        success: true,
        message: "Server is running"
      });
    });

    app.get("/getInfo", createUser);

    // Database connection
    await getSecondaryConnection();
    console.log("Database connected successfully");

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Application initialization failed:", error);
    process.exit(1);
  }

  // Handle unhandled promise rejection
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(() => process.exit(1));
  });

  // Handle uncaught exceptions
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
  });

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log("Server shutting down...");
    server.close(() => {
      console.log("Process terminated");
      process.exit(0);
    });
  });
};

initializeApp();