const { Sequelize, Model } = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

var UserBlockInfo = require("./block_users.model");

class User extends Model {}
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);
User.hasOne(UserBlockInfo);
UserBlockInfo.belongsTo(User);
module.exports = User;
