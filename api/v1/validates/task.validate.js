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

module.exports.changeMulti = (req, res, next) => {
  if (!req.body.ids) {
    res.json({
      code: 400,
      message: "Trong body không có ids của các tasks",
    });
    return;
  }

  if (!req.body.key) {
    res.json({
      code: 400,
      message: "Trong body không có key",
    });
    return;
  }

  if (!req.body.value) {
    res.json({
      code: 400,
      message: "Trong body không có value",
    });
    return;
  }

  if (req.body.key === "status") {
    const statusList = ["initial", "doing", "finish", "pending", "notFinish"];
    if (!statusList.includes(req.body.value)) {
      res.json({
        code: 400,
        message: "Key không hợp lệ!",
      });
      return;
    }
  }
  next();
};
