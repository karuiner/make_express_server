const express = require("express");
const cors = require("cors");

const session = require("express-session");
const app = express();
const port = 4000;
const routes = require("./routes/index");
const { passport, passportSetting } = require("./passport/passport");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
passportSetting();
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
