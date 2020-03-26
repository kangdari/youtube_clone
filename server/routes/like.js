const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");

router.post("/getLikes", (req, res) => {
  const { userId, videoId, commentId } = req.body;

  let variable = {};

  // video
  if (videoId) {
    variable = { videoId };
    // comment
  } else {
    variable = { commentId };
  }

  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, likes });
  });
});

router.post("/getDisLikes", (req, res) => {
  const { userId, videoId, commentId } = req.body;

  let variable = {};

  // video
  if (videoId) {
    variable = { videoId };
    // comment
  } else {
    variable = { commentId };
  }

  DisLike.find(variable).exec((err, dislikes) => {
      if(err) return res.status(400).json({ success: false, err});
      return res.status(200).json({ success: true, dislikes });
  });
});

module.exports = router;
