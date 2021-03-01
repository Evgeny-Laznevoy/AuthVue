const cors = require("cors");
const express = require("express");
const applications = require("./routes/applications");
const app = express();

const API_PREFIX = "/api";

function createApp() {
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use(`${API_PREFIX}/applications`, applications);

  return app;
}

module.exports = createApp;
