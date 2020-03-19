const { User } = require('../models/Users');
// 인증 처리를 하는 곳
let auth = (req, res, next) => {

  // 클라이언트 쿠키에서 token 가져오기
  let token = req.cookies.x_auth;
  // token을 decode(복호화)한 후 user 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저가 없는 경우
    if (!user) {
      return res.json({ isAuth: false, error: true });
    }
    // req에서 token과 user 정보를 조회하기 위해
    // token과 user를 넣어줌
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
