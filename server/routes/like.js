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
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, dislikes });
  });
});

router.post("/upLike", (req, res) => {
  const { userId, videoId, commentId } = req.body;

  let variable = {};

  // video
  if (videoId) {
    variable = { videoId, userId };
    // comment
  } else {
    variable = { commentId, userId };
  }

  // Like Collection에 좋아요 클릭 정보를 저장
  const like = new Like(variable); // Like 인스턴스 생성
  like.save((err, upLikeResult) => {
    if (err) return res.json({ success: false, err });

    // 만약 싫어요가 이미 눌린 상태라면, 싫어요 -1
    DisLike.findOneAndDelete(variable).exec((err, dislikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });
});

router.post("/downLike", (req, res) => {
  const { userId, videoId, commentId } = req.body;

  let variable = {};

  // video
  if (videoId) {
    variable = { videoId, userId };
    // comment
  } else {
    variable = { commentId, userId };
  }

  // 좋아요 삭제
  Like.findOneAndDelete(variable).exec((err, downLikeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/upDisLike", (req, res) => {
  let variable = {};

  // video
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
    // comment
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // DisLike Collection에 싫어요 클릭 정보를 저장
  const disLike = new DisLike(variable); // 싫어요 인스턴스 생성
  disLike.save((err, upDisLikeResult) => {
    if (err) return res.status(400).json({ success: false, err });

    // 좋아요가 눌러진 상태라면 제거하여 좋아요 -1
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });
});

router.post("/downDisLike", (req, res) => {
  let variable = {};
  // video
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    // comment
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // 싫어요 삭제
  DisLike.findOneAndDelete(variable).exec((err, downDisLikeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
