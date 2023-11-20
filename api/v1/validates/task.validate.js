module.exports.changeStatus = (req, res, next) => {
  if (!req.body.status) {
    res.json({
      code: 400,
      message: "Trong body không có key status để update!",
    });
    return;
  }
  const statusList = ["initial", "doing", "finish", "pending", "notFinish"];

  if (!statusList.includes(req.body.status)) {
    res.json({
      code: 400,
      message: "Giá trị của status không hợp lệ!",
    });
    return;
  }
  next();
};
