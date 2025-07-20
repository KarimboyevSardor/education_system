require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres", // ❗️Bu yerda dialect ni aniq ko‘rsatish shart!
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Agar render SSL bilan ishlayotgan bo‘lsa
      }
    }
  }
);

module.exports = sequelize;
