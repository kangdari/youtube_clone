const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

router.post("/saveComment", (req, res) => {
  const { content, postId, writer } = req.body;

  // 인스턴스 생성
  const comment = new Comment({ content, postId, writer });
  // DB에 저장
  comment.save((err, comment) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    // comment에서는 writer 정보에 접근할 수 없으므로
    // Comment에서 comment._id 값으로 검색
    Comment.find({ _id: comment._id })
      .populate("writer") // 모든 writer의 정보를 가져옴
      .exec((err, comment) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({ success: true, comment });
      });
  });
});

module.exports = router;
