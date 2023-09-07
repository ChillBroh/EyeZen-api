const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
// const sightedTestRoutes = require("./routes/sightedTestRoutes")
const sightedTestRoutes = require("./routes/sightedTestRoutes");
const infantQuizRouter = require("./routes/infantQuiz");
const wordRoutes = require("./routes/wordRoutes");


app.use(cors());

//db connection
const connectDB = require("./config/db");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route

const port = process.env.PORT || 5000;

//start the server
const server = app.listen(port, () =>
  console.log(`Server running on port ${port} 🔥`)
);


const base = '/api/v1'

// Routes
app.use(`${base}/sighted`, sightedTestRoutes);
app.use("/api/infantQuiz", infantQuizRouter);
app.use("/api/word", wordRoutes);

app.all("*", (req, res, next) => {
  res.status(404).json({ message: "Not found" });
});


