const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

const purchase = require("./../purchase/purchase.model");

const bomdetails = sequelize.define(
  "bomdetail",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
bomdetails.hasOne(purchase);
purchase.belongsTo(bomdetails);

module.exports = bomdetails;
