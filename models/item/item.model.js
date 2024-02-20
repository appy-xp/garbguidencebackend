const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

const brand = require("./../brand/brand.model");
const size = require("./../size/size.model");
const bom = require("./../bom/bom.model");
const status = require("./../status/status.model");

const item = sequelize.define(
  "item",
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
    itemName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
item.hasMany(size);
item.hasMany(brand);
brand.belongsTo(item);
size.belongsTo(item);
item.hasMany(bom);
bom.belongsTo(item);
item.hasMany(status);
status.belongsTo(item);

module.exports = item;
