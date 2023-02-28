const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Random extends Model {}


Random.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'recipe',
          key: 'id',
        },
    },
    recipe_text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'random',
  }

)

module.exports = Random; 

