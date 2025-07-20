import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import taskifyRoutes from "./routes/taskifyRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:PORT", // Replace with your frontend's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // Allow sending cookies/authorization headers
    optionsSuccessStatus: 204, // For preflight requests (for old browsers)
  })
);
app.use(express.json());
app.use("/tasks", taskifyRoutes);

app.get("/healthy", (req, res) => {
  res.send(`HTTP Server is Running!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
