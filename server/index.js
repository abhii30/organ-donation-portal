const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
// const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

//Import routes
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
app.use("/", authRoutes);

app.listen(3001, () => console.log("server is running....."));

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB!")
);
