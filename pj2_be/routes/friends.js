const express = require("express");
const router = express.Router();
const Friends = require('../models/Friends'); // 친구 모델 가져오기

router.post("/add", async (req, res) => {
  const { name, mobile } = req.body; // req.body 객체에서 변수 추출
  
  // 필수 필드 검사
  if (!name || !mobile) {
    return res.status(400).send({ message: 'Missing fields' }); // 필수 필드가 누락되었을 때 오류 메시지를 보냄
  }
  
  try {
    // 새 친구 객체 생성
    const newFriend = await Friends.create({ name, mobile });
    console.log('New friend added', newFriend);

    // 성공적으로 생성된 친구 객체와 함께 201 Created 응답을 보냄
    res.status(201).send(newFriend);
  } catch (error) {
    // 에러 핸들링
    console.error('Error adding friend:', error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
