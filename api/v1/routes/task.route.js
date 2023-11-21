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
  controller.changeStatus
);

router.patch("/change-multi", taskValidate.changeMulti, controller.changeMulti);

router.post("/create", taskValidate.create, controller.create);

router.patch("/edit/:id", controller.edit);

router.delete("/delete/:id", controller.delete);

module.exports = router;
