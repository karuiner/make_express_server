"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("Auth", "userId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    });
    // await queryInterface.addColumn("User", "authId", {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: "Auth",
    //     key: "id",
    //   },
    //   onUpdate: "SET NULL",
    //   onDelete: "CASCADE",
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Auth", // name of Source model
      "userId" // key we want to remove
    );
    await queryInterface.removeColumn("User", "authId");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
