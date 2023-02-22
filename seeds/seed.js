const userSeed = require('./userData.json');
const recipeSeed = require('./recipeData.json');
const commentSeed = require('./commentSeed');


const sequelize = require('../config/connection');
const { setDefaultResultOrder } = require('dns');



const seedDbs = async () => {
    await sequelize.sync({ force: true });
    console.log('\n --@-- DATABASE IS GROWING FROM SEED! --@--\n');

    await userSeed();
    console.log('\n --@-- USERS ARE GROWING FROM SEED! --@--\n');

    await postSeed();
    console.log('\n --@-- POSTS ARE GROWING FROM SEED! --@--\n');

    await commentSeed();
    console.log('\n --@-- COMMENTS ARE GROWING FROM SEED! --@--\n');

    process.exit(0);
};

seedDbs();