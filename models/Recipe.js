const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // limit name characters to 30
    recipe_name: {
      type: DataTypes.CHAR(30),
      allowNull: false,

    },
    // image is not required, base64 image 
    recipe_image: {
      type: DataTypes.TEXT('long'),
    },
    ingredients: {
      type: DataTypes.TEXT('medium'),
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT('medium'),
      allowNull: false,
    },
    // references user
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

module.exports = Recipe;
