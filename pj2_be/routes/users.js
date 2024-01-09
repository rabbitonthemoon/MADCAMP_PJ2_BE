const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// 회원가입
router.post("/signUp", async (req, res) => {
  // console.log(req)
  const {username, passwd, email} = req.body; //req.body객체에서 변수 추출
  
  if (!username || !passwd || !email) {
    return res.status(400).send('Missing fields'); // 필수 필드가 누락되었을 때 오류 메시지를 보냄
  }
  
  try {
    const hashedPassword = await bcrypt.hash(passwd, 10); //비밀번호 해시 생성

    const user = await User.create({ username, passwd: hashedPassword, email });
    console.log('User Created', user);

    user.passwd = undefined;

    res.status(201).send(user); // 성공적으로 생성된 유저 객체와 함께 201 Created 응답을 보냄
  } catch (error) {
    // 에러 핸들링
    res.status(500).send(error.message);
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { username, passwd } = req.body;
  
  try {
    // 유저 찾기
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(passwd, user.passwd);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid password' });
    }

    // 로그인 성공
    user.passwd = undefined;
    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).send({ message: 'Error during login', error: error.message });
  }
});

module.exports = router;



//   if (!id) res.sendStatus(400);
//     else {
//       const user = User.create({
//         username,
//         passwd,
//         email,
//         })
//       console.log(user)
//     }
// });
// module.exports = router;





// var express = require('express');
// var router = express.Router();
// const bodyParser = require('body-parser');
// const { request } = require('../app');

// //const { newUser } = require("../controller/UserController");

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource')
// });

// router.post('/signUp', function(req, res, next) {
//   console.log(req)
//   const {username, passwd, email} = req.body;

//     if (!username || !passwd || !email) {
//         return res.status(400).send("필수값이 입력되지 않았습니다.");
//     }

//     // 이메일 중복 체크
//     const existingUser = User.findOne({email});
//     if (existingUser) {
//         return res.status(400).send('Email already exists.');
//     }

//     // 비밀번호 해시 생성
//     const hashedPassword = bcrypt.hash(passwd, 10);

//     // create가 생성, 저장까지 해줌
//     const user = User.create({
//         username,
//         passwd: hashedPassword,
//         email,
//     })
//     console.log(user)

//     res.status(200).json({
//         User: user
//     })    
// })

// module.exports = router;