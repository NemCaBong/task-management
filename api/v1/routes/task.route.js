const express = require("express");
const router = express.Router();

// controller
const controller = require("../controllers/task.controller");
// end controler

// [GET] /tasks
router.get("/", controller.index);

// [GET] /tasks/detail/:id
router.get("/detail/:id", controller.detail);

module.exports = router;
