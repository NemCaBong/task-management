const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");

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
