const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

const purchaseDetails = require("./purchasedetails.model");

const purchase = sequelize.define(
  "purchase",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    itemname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
purchase.hasMany(purchaseDetails);
purchaseDetails.belongsTo(purchase);

module.exports = purchase;
