'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Publication,{ onDelete: 'CASCADE', hooks: true });
      models.User.hasMany(models.Comment, { onDelete: 'CASCADE', hooks: true });
      models.User.hasMany(models.Likes, { onDelete: 'CASCADE', hooks: true });
    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
     },
    personFirstname: DataTypes.STRING,
    personLastname: DataTypes.STRING,
    personAdress: DataTypes.STRING,
    personZipcode: DataTypes.STRING,
    personCity: DataTypes.STRING,
    personProblem: DataTypes.STRING,
    personAge: DataTypes.INTEGER,
    userFirstname: DataTypes.STRING,
    userLastname: DataTypes.STRING,
    userAdress: DataTypes.STRING,
    userZipcode: DataTypes.STRING,
    userCity: DataTypes.STRING,
    userPhone1: DataTypes.STRING,
    userPhone2: DataTypes.STRING,
    userMail: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};