const mongoose = require("mongoose");
const mongoosePagination = require("mongoose-paginate");

//Posts schema

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  gif: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

PostSchema.plugin(mongoosePagination);

module.exports = Post = mongoose.model("posts", PostSchema);
