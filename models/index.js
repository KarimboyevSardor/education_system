const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
    logging: config.logging
  }
);

// Modellarni ulash
const User = require("./user")(sequelize, DataTypes);

// Bazani sinxronlashtirish
sequelize.sync({ force: false })
  .then(() => {
    console.log("✅ Jadvallar muvaffaqiyatli yaratildi!");
  })
  .catch((err) => {
    console.error("❌ Sequelize sync xatolik:", err);
  });

module.exports = {
  sequelize,
  Sequelize,
  User
};
