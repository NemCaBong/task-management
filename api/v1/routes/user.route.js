const express = require("express");
const router = express.Router();

const userValidate = require("../validates/user.validate");

const authenMiddleware = require("../middlewares/authen.middleware");

const controller = require("../controllers/user.controller");

// [POST] api/v1/users/register
router.post("/register", userValidate.register, controller.register);

// [POST] api/v1/users/login
router.post("/login", userValidate.login, controller.login);

// [POST] api/v1/users/password/forgot
router.post("/password/forgot", controller.forgotPassword);
// [POST] api/v1/users/password/otp
router.post("/password/otp", controller.otp);

// [POST] api/v1/users/password/reset
router.post("/password/reset", controller.reset);

// [POST] api/v1/users/detail
router.get("/detail", authenMiddleware.requireAuth, controller.detail);

module.exports = router;
