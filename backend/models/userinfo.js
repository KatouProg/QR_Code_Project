'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userInfo.init({
    personFirstname: DataTypes.STRING,
    personLastname: DataTypes.STRING,
    personAdress: DataTypes.STRING,
    personZipcode: DataTypes.STRING,
    personCity: DataTypes.STRING,
    personProblem: DataTypes.STRING,
    personAge: DataTypes.INTEGER,
    userFirstname: DataTypes.STRING,
    userLastname: DataTypes.STRING,
    userZipcode: DataTypes.STRING,
    userCity: DataTypes.STRING,
    userPhone1: DataTypes.STRING,
    userPhone2: DataTypes.STRING,
    userMail: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'userInfo',
  });
  return userInfo;
};