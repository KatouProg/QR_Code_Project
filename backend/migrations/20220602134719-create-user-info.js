'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personFirstname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      personLastname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      personAdress: {
        allowNull: true,
        type: Sequelize.STRING
      },
      personZipcode: {
        allowNull: true,
        type: Sequelize.STRING
      },
      personCity: {
        allowNull: true,
        type: Sequelize.STRING
      },
      personProblem: {
        allowNull: true,
        type: Sequelize.STRING
      },
      personAge: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      zipcode: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phone1: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phone2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
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
    await queryInterface.dropTable('User');
  }
};