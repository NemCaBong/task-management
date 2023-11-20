const express = require("express");
const app = express();

const routesV1 = require("./api/v1/routes/index.route");

// cấu hình env
require("dotenv").config();
// end cấu hình env
const port = process.env.PORT;

// connect DB
const database = require("./config/database");
database.connect();
// END Connect DB

// Routes V1.
routesV1(app);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
