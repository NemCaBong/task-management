const tasksRoute = require("./task.route");
const usersRoute = require("./user.route");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/tasks", tasksRoute);
  app.use(version + "/users", usersRoute);
};
