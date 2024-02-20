const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");
const bomDetails = require("./bomdetails.model");

const bom = sequelize.define(
  "bom",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    modelName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
bom.hasMany(bomDetails);
bomDetails.belongsTo(bom);

module.exports = bom;
