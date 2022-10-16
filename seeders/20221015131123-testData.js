"use strict";
const Models = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          userName: "test1",
        },
        {
          userName: "test2",
        },
        {
          userName: "test3",
        },
      ],
      {}
    );
    const users = await Models.User.findAll({
      include: [
        {
          model: Models.Auth,
        },
      ],
    }).then((x) => x.map((xx) => xx.dataValues.id));
    console.log(users);

    await queryInterface.bulkInsert(
      "Auth",
      [
        {
          password: "password1",
          userId: users[0],
        },
        {
          password: "password2",
          userId: users[1],
        },
        {
          password: "password3",
          userId: users[2],
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User", null, {});

    await queryInterface.bulkDelete("Auth", null, {});
  },
};
