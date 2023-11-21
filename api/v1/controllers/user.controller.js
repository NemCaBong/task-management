const User = require("../models/user.model");
const md5 = require("md5");
const generate = require("../../../helpers/generate");

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
      token: generate.generateRandomString(20),
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
