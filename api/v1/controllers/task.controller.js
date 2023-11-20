const Task = require("../models/task.model");

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

  const tasks = await Task.find(find).sort(sort);

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
