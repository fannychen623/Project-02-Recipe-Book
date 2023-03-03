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
  },
  {
    username: "AB",
    email: "ab@email.com",
    password: "password123"
  },
  {
    username: "Gavin",
    email: "gavin@email.com",
    password: "password123"
  },
  {
    username: "Fanny",
    email: "fanny@email.com",
    password: "password123"
  },
  {
    username: "Benji",
    email: "benji@email.com",
    password: "password123"
  },
  {
    username: "Vanessa",
    email: "vanessa@email.com",
    password: "password123"
  },
  {
    username: "Charlie",
    email: "charlie@email.com",
    password: "password123"
  },
];

const seedCategories = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedCategories;
