const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth_controller");
const { verifyToken } = require("../middlewares/auth_middleware");


router.post("/signup", auth.signup);
router.post("/signin", auth.signin);
// PATCH faqat token bilan
router.patch("/users/:id", verifyToken, auth.updateUser);

// DELETE faqat token bilan
router.delete("/users/:id", verifyToken, auth.deleteUser);

module.exports = router;
