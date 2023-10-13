const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
const connectDB = require("./config/db");
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
const treatmentRoutes = require("./routes/treatmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const videoTutorialRoutes = require("./routes/videoTutorialRoutes");
const sightedTestRoutes = require("./routes/sightedTestRoutes");
const infantQuizRouter = require("./routes/infantQuiz");
const wordRoutes = require("./routes/wordRoutes");
const infantFactRouter = require("./routes/infantFact");
const mainQuizRoute = require("./routes/mainQuiz/MainQuizRoute");
const visionGame = require("./routes/game/visionGameRoute");

const base = "/api/v1";

app.use("/api/treatments", treatmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/videoTutorial", videoTutorialRoutes);
app.use("/api/word", wordRoutes);

// Routes
app.use(`${base}/sighted`, sightedTestRoutes);
app.use("/api/infantQuiz", infantQuizRouter);
app.use("/api/word", wordRoutes);

// Infant Eye Care Facts routes

app.use("/api/infantFact", infantFactRouter);

// Quiz
app.use(`/api/mainQuiz`, mainQuizRoute);
//game
app.use("/api/game", visionGame);

//user
app.use("/api/auth", require("./routes/authRoutes"));

// Error Middleware
const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
app.use(notFound);
app.use(errorHandler);
// Start the Server
const server = app.listen(port, () =>
  console.log(`Server running on port ${port} 🔥`)
);
