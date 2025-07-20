const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json").development;

// Sequelize orqali databasega ulanish
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

// Modelni yuklash
const User = require("./user")(sequelize, DataTypes);

// Jadvallarni yaratish
sequelize.sync({ force: false })
  .then(() => {
    console.log("✅ Jadvallar muvaffaqiyatli yaratildi!");
  })
  .catch((err) => {
    console.error("❌ Sequelize sync xatolik:", err);
  });

// Eksport qilish
module.exports = {
  sequelize,
  Sequelize,
  User
};
