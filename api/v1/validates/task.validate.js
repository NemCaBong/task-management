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
    if (req.body.key === "status") {
      res.json({
        code: 400,
        message: "Trong body không có value",
      });
      return;
    }
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

module.exports.create = (req, res, next) => {
  if (!req.body.status) {
    res.json({
      code: 400,
      message: "Thiếu status",
    });
    return;
  }

  if (!req.body.timeFinish || !req.body.timeStart) {
    res.json({
      code: 400,
      message: "Thiếu time",
    });
    return;
  }

  if (!req.body.title) {
    res.json({
      code: 400,
      message: "Thiếu tiêu đề",
    });
    return;
  }

  if (!req.body.content) {
    res.json({
      code: 400,
      message: "Thiếu nội dung",
    });
    return;
  }

  const statusList = ["initial", "doing", "finish", "pending", "notFinish"];
  if (!statusList.includes(req.body.status)) {
    res.json({
      code: 400,
      message: "Status không hợp lệ!",
    });
    return;
  }
  next();
};
