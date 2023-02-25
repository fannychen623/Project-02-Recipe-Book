const { Recipe } = require('../models');

const recipeData = [
  {
    recipe_name: "Beef Wellington",
    ingredients: "beef, salt, pepper, rosemary, puff pastry, egg",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 1
  },
  {
    recipe_name: "Egg Benedict",
    ingredients: "egg, canadian bacon, english muffin, green onion, dijon mustard",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 4
  },
  {
    recipe_name: "Chicken Alfredo",
    ingredients: "chicken, fettuccine, olive oil, butter, heavy cream, pepper",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 3
  },
  {
    recipe_name: "Oatmeal Cookies",
    ingredients: "flour, oatmeal, butter, egg, sugar",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 2
  },
  {
    recipe_name: "Angus Burger",
    ingredients: "beef, brioche buns, lettuce, tomato, ketchup, mustard, pickle, onion",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 2
  },
  {
    recipe_name: "Lemon Sea Bass",
    ingredients: "sea bass, lemon, rosemary, salt, pepper, butter, paprika",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 3
  },
  {
    recipe_name: "Pad Thai",
    ingredients: "rice noodles, bean sprouts, red pepper, green pepper, carrot, peanuts",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 4
  },
  {
    recipe_name: "Double-Chocolate Brownie",
    ingredients: "dark chocolate chips, butter, vegetable oil, egg, brown sugar",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 2
  },
  {
    recipe_name: "New York Cheesecake",
    ingredients: "cream cheese, graham cracker, sugar, butter, sour cream, blueberry, rasberry",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 2
  },
  {
    recipe_name: "Avocado Toast",
    ingredients: "avocado, pepper, tomato, egg, whole wheat bread, lime",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 4
  },
  {
    recipe_name: "Beef Curry Udon",
    ingredients: "beef, curry, dashi, union, udon, fish cake,carrot, potato",
    instructions: "step 1: , step 2: , step 3: , step 4: , step 5: ",
    user_id: 1
  }
];

const seedCategories = () => Recipe.bulkCreate(recipeData);

module.exports = seedCategories;
