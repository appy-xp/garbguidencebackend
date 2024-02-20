const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

const size = sequelize.define(
  "size",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    sizeName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sizeCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sizeDetail: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = size;
