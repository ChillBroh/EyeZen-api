const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/users", userRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Start the Server
const server = app.listen(port, () =>
  console.log(`Server running on port ${port} 🔥`)
);

// Infant Eye Care routes
const infantQuizRouter = require("./routes/infantQuiz");
app.use("/api/infantQuiz", infantQuizRouter);
