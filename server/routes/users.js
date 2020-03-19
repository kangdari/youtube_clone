const express = require("express");
const router = express.Router();
const { User } = require("../models/Users");
const { auth } = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const { name, email, password, lastname } = req.body;
  try {
    // 빈 요청이 들어오면 오류 처리
    if ([email, password, name].includes("")) {
      return res.status(400).json({ success: false, message: "빈칸 입력" });
    }
    // email 중복 체크
    const exists = await User.findByEmail(email);
    if (exists) {
      return res.status(409).json({ success: false, message: "아이디 중복" });
    }
    const user = new User({
      email,
      name,
      lastname
    });
    // user에 password를 hash하여 저장
    await user.setPassword(password);
    await user.save();
    // 클라이언트에 응답할 데이터에서 password 값을 제거
    // return res.status(200).json(user.serialize());
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 이메일 체크
    const user = await User.findByEmail(email);
    // 이메일 x
    if (!user) {
      return res.status(401).json({
        loginSuccess: false,
        message: "email not found"
      });
    }
    // 비밀번호 체크
    const valid = await user.checkPassword(password);
    if (!valid) {
      return res
        .status(401)
        .json({ loginSuccess: false, message: "wrong password" });
    }
    // email, password가 정상이라면 token 발급
    const token = await user.generateToken();
    // token 쿠키에 담기
    res.cookie("x_auth", token, { httpOnly: true });
    return res.status(200).json({ loginSuccess: true });
  } catch (err) {
    throw err;
  }
});
// auth 인증
router.get("/auth", auth, (req, res) => {
  // user 정보를 전달
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
    isAdmin: req.user.role === 0 ? false : true, // role: 1 > admin
    isAuth: true,
    role: req.user.role,
    image: req.user.image
  });
});
// logout
router.get("/logout", auth, (req, res) => {
  // auth 미들웨어를 수행하면 req에서 user 정보를 조회 가능
  // 유저를 찾고 token을 제거
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false });
    return res.status(200).json({ logoutSuccess: true });
  });
});

module.exports = router;
