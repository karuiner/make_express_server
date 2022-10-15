const express = require("express");

const router = express.Router();

// password 수정
router.patch("/password", (req, res) => {
  res.send("패스워드 수정");
});

// access token 재발급 요청
router.get("/refresh", (req, res) => {
  res.send("access token 재발급 요청");
});

module.exports = router;
