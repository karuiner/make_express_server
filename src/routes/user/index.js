const express = require("express");
const { User, Auth } = require("../../../models");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

// 유저 get 요청
router.get(
  "/:id",
  passport.authenticate("local"),
  (req, res, next) => {
    res.locals.id = Number(req.params.id);
    next();
  },
  (req, res, next) => {
    console.log(req.user);
    const id = res.locals.id;
    User.findByPk(id)
      .then((x) => {
        if (x === null) {
          res.status(400).send("타겟이 존재하지 않음.");
        } else {
          res.locals.user = x;
          next();
        }
      })
      .catch((x) => {
        res.status(400).send("타겟이 옳바르지 않음");
      });
  },
  (req, res) => {
    res.status(200).send(res.locals.user);
  }
);

// 유저 로그아웃
router.get("/signout", (req, res) => {
  res.send("user-signout");
});

// 유저 post 요청
router.post("/", (req, res) => {
  res.send("user-get");
});

// 유저 생성
router.post(
  "/signup",
  // 패스워드 암호화
  (req, res, next) => {
    User.create({ userName: req.body.userName })
      .then((x) => {
        const password = bcrypt.hashSync(req.body.password, 8);

        return Auth.create({
          password: password,
          userId: x.dataValues.id,
        })
          .then((xx) => {
            next();
          })
          .catch((xx) => {
            User.destroy({ where: { id: x.dataValues.id } }).then((x) => {
              res.status(400).send("암호 저장 실패");
            });
          });
      })
      .catch((x) => {
        res.status(400).send("유저 생성 실패");
      });

    next();
  },
  (req, res) => {
    res.send("signup success");
  }
);

// 유저 로그인
router.post("/signin", passport.authenticate("local"), (req, res) => {
  console.log(req.session);
  res.send("user-signin");
});

// 유저 patch 요청
router.patch("/", (req, res) => {
  res.send("user-get");
});

// 유저 delete 요청
router.delete(
  "/:id",
  (req, res, next) => {
    res.locals.id = Number(req.params.id);
    next();
  },
  (req, res, next) => {
    User.destroy({ where: { id: res.locals.id } })
      .then((x) => {
        next();
      })
      .catch((x) => {
        console.log(x);
        res.status(400).send("삭제 실패");
      });
  },
  (req, res) => {
    res.send("delete success");
  }
);

module.exports = router;
