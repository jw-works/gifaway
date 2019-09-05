const express = require("express");
const router = express.Router();

//@route GET api/posts
//@desc Test Route
//@access Public

router.get("/", (req, res) => {
  res.json({ msg: "Posts Route" });
});

module.exports = router;
