const express = require("express");
const router = express.Router();

// const userValidate = require("../validates/user.validate");

const controller = require("../controllers/user.controller");

// [GET] api/v1/users/register
router.post("/register", controller.register);

module.exports = router;
