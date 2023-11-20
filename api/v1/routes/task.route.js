const express = require("express");
const router = express.Router();

// validate
const taskValidate = require("../validates/task.validate");

// controller
const controller = require("../controllers/task.controller");
// end controler

// [GET] /tasks
router.get("/", controller.index);

// [GET] /tasks/detail/:id
router.get("/detail/:id", controller.detail);

router.patch(
  "/change-status/:id",
  taskValidate.changeStatus,
  controller.changeStatusPatch
);

module.exports = router;
