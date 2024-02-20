const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

const purchasedetails = sequelize.define(
  "purchasedetails",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = purchasedetails;
