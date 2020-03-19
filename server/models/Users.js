const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 100,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// email 중복 체크 함수 - static 함수
userSchema.statics.findByEmail = function(email) {
  const user = this;
  return user.findOne({ email });
}
// password > hashedPassword > user에 저장 - 인스턴스 함수
userSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  this.password = hash;
}
//
userSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
}
// 응답할 데이터에서 password 제거 함수 - 인스턴스 함수
userSchema.methods.serialize = function() {
  const data = this.toJSON(); // this -> user
  delete data.password;
  return data;
}
// token 생성 함수 - 인스턴스 함수
userSchema.methods.generateToken = function() {
  const user = this;
  // jwt로 토큰 발급
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save();
  return token;
}
// static 함수: 모델에서 바로 사용할 수 있는 함수
userSchema.statics.findByToken = function(token, cb) {
  const user = this;
  // token을 디코드(복호화)
  jwt.verify(token, 'secretToken', (err, decoded) => {
    // decoded = user._id

    // 유저 아이디를 이용하여 유저를 찾고
    // 클라이언트에서 가져온 token과 db의 token이 일치한지 확인
    user.findOne({ _id: decoded, token: token }, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

// 모델 생성
const User = mongoose.model('User', userSchema);

module.exports = { User };
