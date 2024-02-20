const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

const brand = sequelize.define(
  "brand",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    brandName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = brand;
