var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv').config(); // 환경 변수 로드

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const friendsRouter = require('./routes/friends');
const menuRouter = require('./routes/menu');
const errorhandler = require("./middlewares/errorhandler");

var app = express();
const port = process.env.PORT || 3000; // 포트 설정

// DB연결
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 뷰 엔진 및 미들웨어 설정
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우트 설정
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/menu', menuRouter);
app.use(errorhandler); // 에러 핸들러 설정

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
