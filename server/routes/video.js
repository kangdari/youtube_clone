const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
// const { Video } = require('./models/Video');

const { auth } = require("../middleware/auth"); // toekn 체크

// uploads 폴더가 없으면 생성
fs.readdir("uploads", err => {
  if (err) {
    fs.mkdir("uploads");
  }
});

// video를 서버에 저장, Multer 패키지 사용
let storage = multer.diskStorage({
  // 파일 저장 위치
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // 파일 명 설정: 현재 시간_파일명
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
// multerFilter 함수는 multe 안에 정의되어야한다.
const multerFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  // 동영상이 아닌 경우 에러 발생  
  if (ext !== ".mp4") {
    return cb(new Error("only mp4 is allwoed!"));
  }
  // 동영상 파일
  cb(null, true);
};

// upload func // single 한 개의 파일 업로드
const upload = multer({
  storage: storage,
  fileFilter: multerFilter // 여기에 정의
}).single("file");

router.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    // 클라이언트에 파일 정보 응답
    return res.status(200).json({
      success: true,
      url: res.req.file.path, // 서버에 저장된 파일의 경로
      filename: res.req.file.filename // 서버에 저장된 파일의 이름
    });
  });
});

module.exports = router;
