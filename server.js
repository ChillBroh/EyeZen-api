const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const treatmentRoutes = require("./routes/treatmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const videoTutorialRoutes = require("./routes/videoTutorialRoutes");
const sightedTestRoutes = require("./routes/sightedTestRoutes");
const infantQuizRouter = require("./routes/infantQuiz");
const wordRoutes = require("./routes/wordRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/videoTutorial", videoTutorialRoutes);
app.use("/api/word", wordRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Start the Server
const server = app.listen(port, () =>
  console.log(`Server running on port ${port} 🔥`)
);

const base = "/api/v1";

// Routes
app.use(`${base}/sighted`, sightedTestRoutes);
app.use("/api/infantQuiz", infantQuizRouter);
app.use("/api/word", wordRoutes);

app.all("*", (req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

// Infant Eye Care Facts routes
const infantFactRouter = require("./routes/infantFact");
app.use("/api/infantFact", infantFactRouter);

//quiz
const mainQuizRoute = require("./routes/mainQuiz/MainQuizRoute");
app.use("api/mainQuiz", mainQuizRoute);
