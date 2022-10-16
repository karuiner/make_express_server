"use strict";
const Models = require("../models");
const bcrypt = require("bcrypt");
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

    await queryInterface.bulkInsert(
      "Auth",
      [
        {
          password: bcrypt.hashSync("password1", 8),
          userId: users[0],
        },
        {
          password: bcrypt.hashSync("password2", 8),
          userId: users[1],
        },
        {
          password: bcrypt.hashSync("password3", 8),
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
