const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

const userrole = sequelize.define(
  "userrole",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = userrole;
