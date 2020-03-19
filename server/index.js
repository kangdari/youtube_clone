const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

const videoRoute = require('./routes/video');
const userRoute = require('./routes/users');

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
// user
app.use('/api/users', userRoute);

app.listen(port, () => console.log(`listening on port ${port}`));


