const { User } = require('../models');

const userData = [
  {
    username: "Ryan",
    email: "ryan1@email.com",
    password: "testing123"
  },
  {
    username: "Tyler",
    email: "tyler1@email.com",
    password: "testing456"
  },
  {
    username: "Emma",
    email: "emma1@email.com",
    password: "testing456"
  },
  {
    username: "Steven",
    email: "steven1@email.com",
    password: "testing012"
  }
];

const seedCategories = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedCategories;
