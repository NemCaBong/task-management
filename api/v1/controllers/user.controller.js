// packages
const md5 = require("md5");
// models
const User = require("../models/user.model");
const ForgotPassword = require("../models/forgot-password.model");
// helper
const generateHelper = require("../../../helpers/generate.js");
const sendMailHelper = require("../../../helpers/sendMail.js");

// [POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  try {
    const existsEmail = await User.findOne({
      deleted: false,
      email: req.body.email,
    });

    if (existsEmail) {
      res.json({
        code: 400,
        message: "Email đã tồn tại",
      });
      return;
    }

    const infoUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: md5(req.body.password),
      token: generateHelper.generateRandomString(20),
    };

    const newUser = new User(infoUser);
    await newUser.save();

    res.cookie("token", newUser.token);

    res.json({
      code: 200,
      message: "Đăng ký thành công",
      token: newUser.token,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đăng ký thất bại" + error.message,
    });
  }
};

// [POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
      email: email,
      deleted: false,
    });

    if (!user) {
      res.json({
        code: 400,
        message: "Sai tài khoản",
      });
      return;
    }

    if (md5(password) !== user.password) {
      res.json({
        code: 400,
        message: "Sai mật khẩu",
      });
      return;
    }
    res.cookie("token", user.token);

    res.json({
      code: 200,
      message: "Đăng nhập thành công",
      token: user.token,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đăng nhập thất bại" + error.message,
    });
  }
};

// [POST] /api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({
      deleted: false,
      email: email,
    });

    if (!user) {
      res.json({
        code: 400,
        message: "Email không tồn tại",
      });
      return;
    }

    const otp = generateHelper.generateRandomNumber(8);

    const timeExpire = 5;

    const forgotPasswordObj = {
      email: email,
      otp: otp,
      // 5 phút là hết hạn
      expireAt: Date.now() + timeExpire * 60 * 1000,
    };
    // việc 1: lưu thông tin vào forgotPassword
    const forgotPassword = new ForgotPassword(forgotPasswordObj);
    await forgotPassword.save();

    // việc 2: gửi otp qua mail dùng nodemailer

    const subject = "Xác minh tài khoản";
    const html = `Mã OTP để lấy lại mật khẩu là: <b>${otp}</b>. Thời hạn sử dụng là ${timeExpire} phút. Vui lòng không chia sẻ mã OTP này với bất cứ ai.`;

    sendMailHelper.sendMail(email, subject, html);

    res.json({
      code: 200,
      message: "Đã gửi mã OTP qua email",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lấy mã OTP thất bại" + error.message,
    });
  }
};

// [POST] /api/v1/users/password/otp
module.exports.otp = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;

    const checkOTP = await ForgotPassword.findOne({
      email: email,
      otp: otp,
    });

    if (!checkOTP) {
      res.json({
        code: 400,
        message: "Xác thực thất bại",
      });
      return;
    }
    // Nếu xác thực thành công
    const user = await User.findOne({
      deleted: false,
      email: email,
    });
    // lưu thông tin user vào cookie
    res.cookie("token", user.token);

    res.json({
      code: 200,
      message: "Xác thực thành công",
      token: user.token,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Xác thực thất bại" + error.message,
    });
  }
};

// [POST] /api/v1/users/password/reset
module.exports.reset = async (req, res) => {
  try {
    const token = req.body.token;
    const password = req.body.password;

    const user = await User.findOne({
      token: token,
      deleted: false,
    });

    if (!user) {
      res.json({
        code: 400,
        message: "Tài khoản không tồn tại",
      });
      return;
    }

    if (md5(password) === user.password) {
      res.json({
        code: 400,
        message: "Vui lòng nhập mật khẩu khác mật khẩu cũ",
      });
      return;
    }

    await User.updateOne(
      {
        token: token,
      },
      {
        password: md5(password),
      }
    );

    res.json({
      code: 200,
      message: "Thay đổi mật khẩu thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thay đổi mật khẩu thất bại " + error.message,
    });
  }
};

// [GET] /api/v1/users/detail
module.exports.detail = async (req, res) => {
  res.json({
    code: 200,
    message: "Thành công",
    info: req.user,
  });
};

// [GET] /api/v1/users/list
module.exports.listUser = async (req, res) => {
  try {
    const usersList = await User.find({ deleted: false }).select(
      "fullName email"
    );
    res.json({
      code: 200,
      message: "Lấy thành công",
      users: usersList,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lấy thất bại" + error.message,
    });
  }
};
