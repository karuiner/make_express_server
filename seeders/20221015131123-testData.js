"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.bulkInsert(
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
    await queryInterface.bulkInsert(
      "Auth",
      [
        {
          password: "password1",
          userId: 13,
        },
        {
          password: "password2",
          userId: 14,
        },
        {
          password: "password3",
          userId: 15,
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
