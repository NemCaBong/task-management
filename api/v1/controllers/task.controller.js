const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  /// bộ lọc
  if (req.query.status) {
    find.status = req.query.status;
  }
  // hết lọc

  const sort = {};

  // sắp xếp
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  // hết sắp xếp

  // Phân trang
  const totalTasks = await Task.countDocuments(find);

  const paginationObj = paginationHelper(
    {
      currentPage: 1,
      limitItems: 2,
    },
    req.query,
    totalTasks
  );
  // ket thuc phan trang

  const searchObj = searchHelper(req.query);
  if (searchObj.keyword) {
    find.title = searchObj.keywordRegex;
  }

  const tasks = await Task.find(find)
    .sort(sort)
    .skip(paginationObj.skip)
    .limit(paginationObj.limitItems);

  res.json(tasks);
};

module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false,
  });

  res.json(task);
};

module.exports.changeStatusPatch = async (req, res) => {
  try {
    const status = req.body.status;
    const id = req.params.id;
    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );
    res.json({ code: 200, message: "Cập nhật trạng thái thành công!" });
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật trạng thái không thành công! " + error.message,
    });
  }
};
