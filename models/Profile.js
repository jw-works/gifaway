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
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
