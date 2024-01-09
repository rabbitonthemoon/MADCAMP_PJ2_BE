const express = require("express");
const router = express.Router();
const Menu = require('../models/Menu');
const Friends = require('../models/Friends');

// 메뉴에 좋아요 누르기
router.post("/like", async (req, res) => {
  const { menuId, friendId } = req.body;
  
  try {
    // 메뉴 찾기
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).send({ message: 'Menu not found' });
    }

    // 친구 찾기
    const friend = await Friends.findById(friendId);
    if (!friend) {
      return res.status(404).send({ message: 'Friend not found' });
    }

    // '좋아요' 추가
    menu.fav_name = friend._id;
    await menu.save();

    // 응답 보내기
    res.status(200).send({ message: 'Like added', menu });
  } catch (error) {
    res.status(500).send({ message: 'Error adding like', error: error.message });
  }
});

module.exports = router;
