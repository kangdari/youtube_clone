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

// DB 저장 전에 암호를 해쉬
userSchema.pre('save', function(next) {
  const user = this;
  // 비밀번호가 수정될 때
  if (user.isModified('password')) {
    // 암호를 해쉬
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    // 비밀번호 수정이 아닐때는 바로 save
    next();
  }
});
// instance 함수: 모델로 만든 인스턴스에서 사용할 수 있는 함수
// password 확인 함수
userSchema.methods.comparePassword = function(reqeustPassword, cb) {
  // this.password: hash
  bcrypt.compare(reqeustPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    // 비밀번호가 같다면, isMatch: true
    cb(null, isMatch);
  });
};
// token 생성 함수
userSchema.methods.generateToken = function(cb) {
  const user = this;
  // jsonwebtoken을 이용하여 token 생성
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  // user._id + "secretToken" > encode > token
  // decode 할 때 "secretToken" 을 넣어주면 user._id 값이 나옴
  // User DB에 user._id를 가진 token이 있다면 인증 성공

  // db에 token 저장
  user.token = token;
  user.save((err, user) => {
    if (err) return err;
    cb(null, user);
  });
};
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
