const express = require("express");
const router = express.Router();

const webhook_controller = require("../controllers/webhook_controller");

router.post("/create", webhook_controller.create);
router.post("/update", webhook_controller.update);
router.post("/delete", webhook_controller.delete);

module.exports = router;