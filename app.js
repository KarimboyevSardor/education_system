// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/db');
sequelize.authenticate()
  .then(() => {
    console.log('✅ Render PostgreSQL bazasiga muvaffaqiyatli ulandik!');
  })
  .catch(err => {
    console.error('❌ Ulanishda xatolik:', err);
  });
  
// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routers
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

module.exports = { app, sequelize };
