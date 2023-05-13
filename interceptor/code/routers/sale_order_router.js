const express = require("express");
const router = express.Router();

const sale_order_controller = require("../controllers/sale_order_controller");

router.get("/", sale_order_controller.index);
router.get("/:id", sale_order_controller.detail);
router.post("/", sale_order_controller.create);
router.put("/:id", sale_order_controller.update);

module.exports = router;