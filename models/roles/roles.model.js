const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

const roles = sequelize.define(
  "roles",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    roles: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "user",
      values: ["superadmin", "admin", "user", "developer"],
      unique: true,
      validate: {
        isIn: {
          args: [["superadmin", "admin", "user", "developer"]],
          msg: "Incorrect options",
        },
      },
    },
    role_id: {
      type: Sequelize.INTEGER,
      values: [1000001, 1000011, 1001111, 1011111],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = roles;
