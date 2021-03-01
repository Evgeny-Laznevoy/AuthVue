require("dotenv").config();
const mongoose = require("mongoose");
// const express = require("express");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const createApp = require("./createApp");
const { MONGODB_URI, PORT } = require("./config");
const Role = require("./model/role");
const { count } = require("./model/role");

// const API_PREFIX = "/api";

// const db = mongoose.connection;

async function run() {
  try {
    console.log(`${MONGODB_URI}`);
    await mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("Connected to the database");
        initial();
      })
      .catch((error) => console.log(error));

    const app = createApp();

    app.listen(PORT, () => {
      console.log(`[OK] Server is running on localhost:${PORT}`);
    });
  } catch (err) {
    error(err);
  }
}

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added user to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added moderator to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added admin to roles collection");
      });
    }
  });
}

run();