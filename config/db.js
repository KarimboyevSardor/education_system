// require('dotenv').config();
// const { Sequelize, DataTypes } = require('sequelize');
// const env = process.env.NODE_ENV || 'development';
// const config = require('./config')[env];

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   port: config.port,
//   dialect: config.dialect
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Modelni ulash
// db.User = require('../models/user')(sequelize, DataTypes);
// // Agar boshqa modellaringiz bo‘lsa shu yerda ulashing

// module.exports = db;


require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Render PostgreSQL uchun env-dan ma'lumotlarni olish
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Render-da SSL kerak bo'lishi mumkin
      }
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modellarni ulash
db.User = require('../models/user')(sequelize, DataTypes);
// Boshqa modellaringiz bo‘lsa shu yerga qo‘shing

module.exports = db;
