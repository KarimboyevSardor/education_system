require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelni ulash
db.User = require('../models/user')(sequelize, DataTypes);
// Agar boshqa modellaringiz bo‘lsa shu yerda ulashing

module.exports = db;
