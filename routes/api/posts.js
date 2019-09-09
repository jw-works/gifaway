const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authMiddlware = require("../../middleware/auth");
const Post = require("../../models/Posts");
const User = require("../../models/User");

//@route POST api/posts
//@desc Create a post
//@access Private

router.post(
  "/",
  [
    authMiddlware,
    [
      check("title", "Please enter a title for the post")
        .not()
        .isEmpty(),
      check("body", "Please enter the content of the post")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { gif } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        user: req.user.id,
        name: user.username
      });

      if (gif) newPost.gif = gif;

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route PUT api/posts/post/:id
//@desc Update a post
//@access Private

router.put(
  "/post/:id",
  [
    authMiddlware,
    [
      check("title", "Please enter a title for the post")
        .not()
        .isEmpty(),
      check("body", "Please enter the content of the post")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { gif, title, body } = req.body;

    const postFields = {};
    if (gif) postFields.gif = gif;
    postFields.title = title;
    postFields.body = body;

    try {
      let post = await Post.findById(req.params.id);

      if (post) {
        post = await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $set: postFields },
          { new: true }
        );
        return res.json(post);
      } else {
        return res.status(404).json({ msg: "Post does not exist" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/posts/
//@desc Get all the posts
//@access Public

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/posts/:pageNumber
//@desc Get all the posts with pagination
//@access Public

router.get("/:page", async (req, res) => {
  try {
    const posts = await Post.paginate(
      {},
      {
        page: `${req.params.page}`,
        limit: 6,
        sort: { date: -1 }
      }
    );

    res.json({ posts: posts.docs, pages: posts.pages });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/posts/post/:id
//@desc Get a single post
//@access Private
router.get("/post/:id", authMiddlware, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/posts/:id
//@desc Delete a post by ID
//@access Private

router.delete("/:id", authMiddlware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post deleted" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjecID") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route PUT api/posts/like/:id
//@desc Like a post
//@access Private

router.put("/like/:id", authMiddlware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/posts/unlike/:id
//@desc Like a post
//@access Private

router.put("/unlike/:id", authMiddlware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post is not liked" });
    }

    //Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
