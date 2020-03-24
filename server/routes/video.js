const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");

const { Video } = require("../models/Video"); // Video model
const { auth } = require("../middleware/auth"); // toekn 체크

// 폴더가 없으면 생성
fs.readdir("uploads", err => {
  if (err) {
    fs.mkdirSync("uploads");
  }
});
fs.readdir("uploads/thumbnails", err => {
  if (err) {
    fs.mkdirSync("uploads/thumbnails");
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

router.post("/thumbnail", (req, res) => {
  // console.log(req.body.url);

  let thumbnailPath = ""; // 영상 저장 경로
  let fileDuration = ""; // 영상 시간

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, (err, metadata) => {
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성, 비디오 러닝 타임 가져오기
  ffmpeg(req.body.url)
    .on("filenames", filenames => {
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);
      // thumnail 저장 주소
      thumbnailPath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", () => {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbnailPath: thumbnailPath, // thumbnail 저장 경로
        fileDuration: fileDuration // 영상 시간
      });
    })
    .on("error", err => {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 3, // 갯수
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b: input basename (입력한 파일 이름, 확장자 명 제외)
      filename: "thumbnail-%b.png"
    });
});

router.post("/uploadVideo", (req, res) => {
  // req.body => onSubmit으로 클라이언트에서 넘겨준 데이터
  // 비디오 정보들을 저장
  const video = new Video(req.body);
  video.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true });
  });
});

router.get("/getVideos", (req, res) => {
  // DB에서 video들을 가져옴.
  Video.find()
    .populate("writer") // populate를 사용해야 ref에 해당 ObjectID가 속해있는 모델을 가져올 수 있다.
    // 즉, ObjectID에 해당하는 값과 객체를 치환하는 역할.
    .exec((err, videos) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, videos });
    });
});

module.exports = router;
