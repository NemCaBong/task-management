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
