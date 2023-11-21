const express = require("express");
const chatController = require("../controller/chatController");

const router = express.Router();

router.post("/login", chatController.login);
router.post("/signup", chatController.signup);

module.exports = router;
