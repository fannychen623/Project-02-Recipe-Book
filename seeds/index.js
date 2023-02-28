const seedUsers = require('./user-seeds');
const seedRecipes = require('./recipe-seeds');
const seedFavorites = require('./favorite-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedRecipes();
  console.log('\n----- BLOGS SEEDED -----\n');

  await seedFavorites();
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedAll();