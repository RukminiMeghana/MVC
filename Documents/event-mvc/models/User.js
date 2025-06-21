const { DataTypes } = require('sequelize');
const sequelize      = require('./index');
const bcrypt         = require('bcrypt');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Hash password before saving
User.beforeCreate(async user => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
