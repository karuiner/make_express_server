const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const { User, Auth } = require("../../models");

// local strategy
function verify(userName, password, cb) {
  User.findOne({ where: { userName: userName }, include: [{ model: Auth }] })
    .then(({ dataValues: user }) => {
      if (!user) {
        return cb(null, false, {
          message: "Incorrect username or password.",
        });
      }
      let k = bcrypt.hashSync(password, 8);
      bcrypt.compare(
        password,
        user.Auth.dataValues.password,
        function (err, result) {
          if (err) {
            cb(err);
          }
          if (result) {
            delete user.Auth;
            cb(null, user);
          } else {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
        }
      );

      return;
    })
    .catch((err) => {
      cb(err);
    });
}

function passportSetting() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(({ dataValues: user }) => {
        if (user) {
          done(null, user);
        } else {
          done("err");
        }
      })
      .catch(() => {
        done("err");
      });
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "userName", passwordField: "password" },
      verify
    )
  );
}

module.exports = { passport, passportSetting };
