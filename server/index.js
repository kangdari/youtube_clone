const express = require('express');
const app = express();
const { User } = require('./models/Users');
const port = 5000;
const bodyParser = require('body-parser');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

const { auth } = require('./middleware/auth');

const videoRoute = require('./routes/video');

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('hello'));

app.get('/api/hello', (req, res) => res.send('hello react'));

// video
app.use('/api/video', videoRoute);

app.post('/api/users/register', async (req, res) => {
  const { name, email, password, lastname } = req.body;
  try {
    // 빈 요청이 들어오면 오류 처리
    if([email, password, name].includes('')){
      return res.status(400).json({ success: false, message: '빈칸 입력' });
    }
    // email 중복 체크
    const exists = await User.findByEmail(email);
    if (exists) {
      return res.status(409).json({ success: false, message: '아이디 중복' });
    }
    const user = new User({
      email,
      name,
      lastname,
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

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try{
    // 이메일 체크
    const user = await User.findByEmail(email);
    // 이메일 x
    if(!user) {
      return res.status(401).json({ 
        loginSuccess: false,
        message: 'email not found'
      })
    }
    // 비밀번호 체크
    const valid = await user.checkPassword(password);
    if(!valid) {
      return res.status(401).json({ loginSuccess: false, message: 'wrong password' })
    }
    // email, password가 정상이라면 token 발급
    const token = await user.generateToken();
    // token 쿠키에 담기
    res.cookie('x_auth', token, { httpOnly: true });
    return res.status(200).json({ loginSuccess: true })
  }catch(err) {
    throw err;
  }
});
// auth 인증
app.get('/api/users/auth', auth, (req, res) => {
  // user 정보를 전달
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
    isAdmin: req.user.role === 0 ? false : true, // role: 1 > admin
    isAuth: true,
    role: req.user.role,
    image: req.user.image,
  });
});
// logout
app.get('/api/users/logout', auth, (req, res) => {
  // auth 미들웨어를 수행하면 req에서 user 정보를 조회 가능
  // 유저를 찾고 token을 제거
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false });
    return res.status(200).json({ success: true });
  });
});


app.post('/api/video/upload', (req, res) => {

})

app.listen(port, () => console.log(`listening on port ${port}`));
