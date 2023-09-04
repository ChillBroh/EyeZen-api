const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

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
