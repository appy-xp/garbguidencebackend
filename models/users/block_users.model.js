const { Sequelize, Model } = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

class UserBlockInfo extends Model {}
UserBlockInfo.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    isBlocked: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
      values: [0, 1],
    },
    from: { type: Sequelize.BIGINT },
    to: { type: Sequelize.BIGINT },
  },
  { sequelize, modelName: "blockuser" }
);

module.exports = UserBlockInfo;
