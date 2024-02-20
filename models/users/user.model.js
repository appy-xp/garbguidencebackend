const { Sequelize, Model } = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

var UserBlockInfo = require("./block_users.model");
var userRoleInfo = require("./user_role.model");
var roleInfo = require("./../roles/roles.model");

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
    password: {
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
User.hasOne(userRoleInfo);
UserBlockInfo.belongsTo(User);
userRoleInfo.belongsTo(User);
roleInfo.hasOne(userRoleInfo);
userRoleInfo.belongsTo(roleInfo);
module.exports = User;
