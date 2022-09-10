const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  { id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    time: {
      type: DataTypes.DATETIME,
      allowNull: false
    },
    place: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    host_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    items: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;
