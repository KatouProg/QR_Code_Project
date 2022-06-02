'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personFirstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      personLastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      personAdress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      personZipcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      personCity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      personProblem: {
        allowNull: false,
        type: Sequelize.STRING
      },
      personAge: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userFirstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userLastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userZipcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userCity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userPhone1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userPhone2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      userMail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('userInfos');
  }
};