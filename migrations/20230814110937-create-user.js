"use strict";

const { DataTypes } = require("sequelize");
const USER_STATUS = require("../constants/USER_STATUS");
const ROLE = require("../constants/ROLE");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      id: {
        type: Sequelize.STRING,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: DataTypes.STRING,
      securityHash: DataTypes.STRING,
      securityHashExpiry: DataTypes.DATE,
      description: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        defaultValue: "https://i.imgur.com/6VBx3io.png",
      },
      website: DataTypes.STRING,
      facebook: DataTypes.STRING,
      twitter: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      telegram: DataTypes.STRING,
      lastLogged: DataTypes.DATE,
      role: {
        type: DataTypes.STRING,
        defaultValue: ROLE.USER,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: USER_STATUS.ACTIVE,
      },
      newsletter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
