const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect to MongoDB
connectDB();

//Init Body Parser
app.use(express.json({ extended: true }));

//Root Route
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to gifoetry API" });
});

//Define routes
app.use("/api/users", require("./routes/api/users")); //User Route
app.use("/api/profile", require("./routes/api/profile")); //Profile Route
app.use("/api/auth", require("./routes/api/auth")); //Auth Route
app.use("/api/posts", require("./routes/api/posts")); //Posts Route

const PORT = process.env.PORT || 5000;

//Listen to the port
app.listen(PORT, () => console.log("Server started at the port " + PORT));
