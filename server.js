const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

//Connect to MongoDB
connectDB();

//Root Route
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to gifoetry API" });
});

//Listen to the port
app.listen(PORT, () => console.log("Server started at the port " + PORT));
