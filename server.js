const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to gifoetry API" });
});

app.listen(PORT, () => console.log("Server started at the port " + PORT));
