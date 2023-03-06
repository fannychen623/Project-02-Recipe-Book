// define all modules to seed
const seedUsers = require('./user-seeds');
const seedRecipes = require('./recipe-seeds');
const seedFavorites = require('./favorite-seeds');

// define connection to database
const sequelize = require('../config/connection');

// connect and seed all models to database
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedRecipes();
  console.log('\n----- RECIPES SEEDED -----\n');

  await seedFavorites();
  console.log('\n----- FAVORITES SEEDED -----\n');

  process.exit(0);
};

seedAll();