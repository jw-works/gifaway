const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

//DB Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route GET api/profile/me
//@desc Fetch a users' profile
//@access Private

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["username", "phrase"]
    );

    if (!profile) {
      return res.json(null);
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route POST api/profile
//@desc Create / Update user profile
//@access Private

router.post(
  "/",
  [
    authMiddleware,
    [
      check(
        "phrase",
        "Sorry, but this field is required! Just type in your fav quote!"
      )
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: [errors.array()] });
    }
    const { phrase } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.phrase = phrase;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create New Profile
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/profile/user/:id
//@desc Access a single profile
//@access Private

router.get("/user/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      "user",
      ["username"]
    );

    if (!profile) return res.status(400).json({ msg: "User does not exist" });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "User does not exist" });
    }
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/profile
//@desc Delete user profile, user and posts
//@access Private

router.delete("/", authMiddleware, async (req, res) => {
  try {
    //@todo: Remove Posts

    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //Remove User
    await User.findByIdAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
