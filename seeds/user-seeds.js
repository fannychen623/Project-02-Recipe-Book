// seed data for user model
const { User } = require('../models');

const userData = [
  {
    username: "Rene",
    email: "rene1@email.com",
    password: "testing123"
  },
  {
    username: "Tyler",
    email: "tyler1@email.com",
    password: "testing123"
  },
  {
    username: "Emma",
    email: "emma1@email.com",
    password: "testing123"
  },
  {
    username: "Steven",
    email: "steven1@email.com",
    password: "testing123"
  },
];

const seedCategories = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedCategories;
