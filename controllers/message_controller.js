// controllers/messageController.js
const Message = require('../models/message');

const saveMessage = async ({ senderId, receiverId, message, role }) => {
  try {
    await Message.create({ senderId, receiverId, message, role });
  } catch (error) {
    console.error("Xabarni saqlashda xatolik:", error.message);
  }
};

module.exports = {
  saveMessage
};
