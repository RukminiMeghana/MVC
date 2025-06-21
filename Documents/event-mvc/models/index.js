const { Sequelize } = require('sequelize');
const path = require('path');

// Create (or open) database file in data/
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../data/database.sqlite')
});

module.exports = sequelize;
