const express = require("express");
const router = express.Router();

const userValidate = require("../validates/user.validate");

const controller = require("../controllers/user.controller");

// [POST] api/v1/users/register
router.post("/register", userValidate.register, controller.register);

// [POST] api/v1/users/login
router.post("/login", userValidate.login, controller.login);

module.exports = router;
