const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search");

// [PATCH] /api/v1/tasks
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

// [PATCH] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false,
  });

  res.json(task);
};

// [PATCH] /api/v1/tasks/change-status
module.exports.changeStatus = async (req, res) => {
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

// [PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const { ids, key, value } = req.body;
    switch (key) {
      case "status":
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: value,
          }
        );
        res.json({
          code: 200,
          message: "Cập nhật nhiều trạng thái thành công!",
        });
        break;
      case "deleted":
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            deleted: true,
            deletedAt: new Date(),
          }
        );
        res.json({
          code: 200,
          message: "Xóa nhiều tasks thành công!",
        });
        break;
      default:
        res.json({
          code: 400,
          message:
            "Cập nhật nhiều trạng thái không thành công! " + error.message,
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật nhiều trạng thái không thành công! " + error.message,
    });
  }
};

// [POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();

    res.json({
      code: 200,
      message: "Tạo mới thành công!",
      data: newTask,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạo mới thất bại!" + error,
      data: newTask,
    });
  }
};

// [PATCH] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.updateOne(
      {
        _id: id,
      },
      req.body
    );
    res.json({
      code: 200,
      message: "Chỉnh sửa thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Chỉnh sửa không thành công! " + error.message,
    });
  }
};

// [DELETE] /api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
    res.json({
      code: 200,
      message: "Xóa task thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Xóa task không thành công! " + error.message,
    });
  }
};
