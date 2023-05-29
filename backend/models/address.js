'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  address.init({
    uID : DataTypes.INTEGER,
    add1: DataTypes.STRING,
    add2: DataTypes.STRING,
    pinCode: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};