const Sequelize = require("sequelize");
const sequelize = require("./../../config/sqlconnection");

const status = sequelize.define(
  "status",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    isAssigned: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      values: [true, false],
      validate: {
        isIn: {
          args: [[true, false]],
          msg: "Incorrect options",
        },
      },
    },
    isReceived: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      values: [true, false],
      validate: {
        isIn: {
          args: [[true, false]],
          msg: "Incorrect options",
        },
      },
    },
    isSteching: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      values: [true, false],
      validate: {
        isIn: {
          args: [[true, false]],
          msg: "Incorrect options",
        },
      },
    },
    isFinishing: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      values: [true, false],
      validate: {
        isIn: {
          args: [[true, false]],
          msg: "Incorrect options",
        },
      },
    },
    isPacking: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      values: [true, false],
      validate: {
        isIn: {
          args: [[true, false]],
          msg: "Incorrect options",
        },
      },
    },
    isDispatched: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      values: [true, false],
      validate: {
        isIn: {
          args: [[true, false]],
          msg: "Incorrect options",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = status;
