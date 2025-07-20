require('dotenv').config();
const { app, sequelize } = require('./app');
const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ DB ulanishda xatolik:", err);
});
