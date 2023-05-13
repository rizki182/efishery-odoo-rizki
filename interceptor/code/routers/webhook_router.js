const express = require("express");
const router = express.Router();

const webhook_controller = require("../controllers/webhook_controller");

router.post("/update", webhook_controller.update);

module.exports = router;