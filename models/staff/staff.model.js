const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");
const status = require("./../status/status.model");

const staff = sequelize.define(
  "staff",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contactNo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
staff.hasMany(status);
status.belongsTo(staff);
module.exports = staff;
