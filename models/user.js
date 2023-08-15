"use strict";
const { Model } = require("sequelize");
const ROLE = require("../constants/ROLE");
const USER_STATUS = require("../constants/USER_STATUS");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
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
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
