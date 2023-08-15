"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mentor.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  mentor.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      user_id: DataTypes.STRING,
      company: DataTypes.STRING,
      job: DataTypes.STRING,
      location: DataTypes.STRING,
      category: DataTypes.STRING,
      skills: DataTypes.STRING,
      bio: DataTypes.TEXT,
      twitter: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      website: DataTypes.STRING,
      intro: DataTypes.STRING,
      article: DataTypes.STRING,
      why: DataTypes.TEXT,
      achievement: DataTypes.TEXT,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "mentor",
    }
  );
  return mentor;
};
