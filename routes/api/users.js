const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route POST api/users
//@desc Register User Route
//@access Public

router.post(
  "/",
  [
    //Check for username field and limit it to 10 characters
    check("username", "Please enter a username")
      .not()
      .isEmpty(),
    check(
      "username",
      "The username must not exceed more than 10 characters"
    ).isLength({ max: 10 }),

    //Validate Email Address
    check("email", "Please enter a valid email address").isEmail(),

    //Check for password and its character limit
    check("password", "Please enter your password")
      .not()
      .isEmpty(),
    check("password", "Password must contain minimum of 8 characters").isLength(
      { min: 8 }
    )
  ],
  async (req, res) => {
    try {
      //Handle errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      let user = await User.findOne({ username });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: "Oops. User already exists with that username" }]
        });
      }

      //Create a new user
      user = new User({
        username,
        email,
        password
      });

      //Encrypt/Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //Save the user to the DB
      await user.save();

      //Return JW Token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("secret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
