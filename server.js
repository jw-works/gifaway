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

//Define routes
app.use("/api/users", require("./routes/api/users")); //User Route
app.use("/api/profile", require("./routes/api/profile")); //Profile Route
app.use("/api/auth", require("./routes/api/auth")); //Auth Route
app.use("/api/posts", require("./routes/api/posts")); //Posts Route

//Listen to the port
app.listen(PORT, () => console.log("Server started at the port " + PORT));
