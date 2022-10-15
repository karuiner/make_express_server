const express = require("express");

const router = express.Router();

// 유저 get 요청
router.get("/", (req, res) => {
  res.send("user-get");
});

// 유저 로그아웃
router.get("/signout", (req, res) => {
  res.send("user-signout");
});

// 유저 post 요청
router.post("/", (req, res) => {
  res.send("user-get");
});

// 유저 생성
router.post("/signup", (req, res) => {
  res.send("user-signup");
});

// 유저 로그인
router.post("/signin", (req, res) => {
  res.send("user-signin");
});

// 유저 patch 요청
router.patch("/", (req, res) => {
  res.send("user-get");
});

// 유저 delete 요청
router.delete("/", (req, res) => {
  res.send("user-get");
});

module.exports = router;
