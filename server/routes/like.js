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

  Like.find(variable)
    .exec((err, likes) => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, likes }); 
    })
});

module.exports = router;
