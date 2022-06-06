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
      firstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zipcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone1: {
        allowNull: false,
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