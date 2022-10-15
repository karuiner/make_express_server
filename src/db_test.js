const Models = require("../models");
const seq = require("sequelize");

Models.User.findAll({
  include: [
    {
      model: Models.Auth,
    },
  ],
}).then((x) => {
  console.log(x);
});