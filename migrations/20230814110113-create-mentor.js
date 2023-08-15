'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mentors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      job: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      twitter: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      intro: {
        type: Sequelize.STRING
      },
      article: {
        type: Sequelize.STRING
      },
      why: {
        type: Sequelize.TEXT
      },
      achievement: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mentors');
  }
};