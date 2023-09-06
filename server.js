const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
// const sightedTestRoutes = require("./routes/sightedTestRoutes")
const sightedTestRoutes = require("./routes/sightedTestRoutes");


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
// Infant Eye Care routes
// const infantQuizRouter = require("./routes/infantQuiz");
app.use(`${base}/sighted`, sightedTestRoutes);

// app.use("/api/infantQuiz", infantQuizRouter);

// sightedTest routes 
// app.use("/api/start-sighted-test", sightedTestRoutes);

app.all("*", (req, res, next) => {
  
});


