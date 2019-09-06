const mongoose = require("mongoose");

//Profile Schema
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  phrase: {
    type: String,
    required: true
  },
  social: {
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    tumblr: {
      type: String
    },
    blog: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
