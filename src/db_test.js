const Models = require("../models");
const seq = require("sequelize");

// Models.User.findAll({
//   include: [
//     {
//       model: Models.Auth,
//     },
//   ],
// }).then((x) => {
//   console.log(x);
// });

// Models.Auth.destroy({
//   where: { id: 2 },
// });
Models.User.findOne({
  where: { userName: "test2" },
  include: [{ model: Models.Auth }],
}).then(({ dataValues: user }) => {
  console.log(user);
});
