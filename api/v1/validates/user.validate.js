module.exports.register = (req, res, next) => {
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Không có email",
    });
    return;
  }

  if (!req.body.fullName) {
    res.json({
      code: 400,
      message: "Không có tên",
    });
    return;
  }

  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Không có mật khẩu",
    });
    return;
  }

  next();
};
