// import models
const User = require('./User');
const Recipe = require('./Recipe');
const Favorite = require('./Favorite');

// define model associations
User.hasMany(Recipe, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Favorite, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Favorite.belongsTo(User, {
  foreignKey: 'user_id'
});


Recipe.hasMany(Favorite, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE'
});


Favorite.belongsTo(Recipe, {
  foreignKey: 'recipe_id'
});

module.exports = { User, Recipe, Favorite };


