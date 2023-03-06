const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Define SQL database with secure .env file
if (process.env.JAWSDB_URL) {
  // JAWSDB URL for deployment
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
