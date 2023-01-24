const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProviderInfo extends Model {}

ProviderInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dogWalk: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    dogFeed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    sTDogSit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    lTDogSit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    small: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    medium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    large: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "providerInfo",
  }
);

module.exports = ProviderInfo;
