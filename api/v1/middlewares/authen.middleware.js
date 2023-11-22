const User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    // set up bearer token trong postman
    // lấy ra header trong bearer header trong postman
    const token = req.headers.authorization.split(" ")[1];

    const user = await User.findOne({
      deleted: false,
      token: token,
    });

    if (!user) {
      res.json({
        code: 403,
        message: "Không có quyền truy cập",
      });
    } else {
      // gửi user qua request để controller nhận đc
      req.user = user;
      next();
    }
  } else {
    res.json({
      code: 403,
      message: "Không có quyền truy cập",
    });
  }
};
