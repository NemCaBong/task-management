const tasksRoute = require("./task.route");
const usersRoute = require("./user.route");

// middleware
const authenMiddleware = require("../middlewares/authen.middleware");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/tasks", authenMiddleware.requireAuth, tasksRoute);
  app.use(version + "/users", usersRoute);
};
