const userSeed = require('./userData.json');
const recipeSeed = require('./recipeData.json');
const favoriteSeed = require('./commentSeed.json');


const sequelize = require('../config/connection');
const { setDefaultResultOrder } = require('dns');



const seedDbs = async () => {
    await sequelize.sync({ force: true });
    console.log('\n --@-- DATABASE IS GROWING FROM SEED! --@--\n');

    await userSeed();
    console.log('\n --@-- USERS ARE GROWING FROM SEED! --@--\n');

    await recipeSeed();
    console.log('\n --@-- POSTS ARE GROWING FROM SEED! --@--\n');

    await favoriteSeed();
    console.log('\n --@-- COMMENTS ARE GROWING FROM SEED! --@--\n');

    process.exit(0);
};

seedDbs();