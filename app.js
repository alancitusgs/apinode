require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/services/mysql");
const bodyParser = require("body-parser");
const { getRoutes } = require("./src/routes");
const { PORT } = require("./src/config");

async function run() {
  const connection = await connectDB();
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.use(getRoutes(connection));
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

run();
