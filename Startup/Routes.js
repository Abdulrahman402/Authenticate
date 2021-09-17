const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const user = require("../Routes/User");

module.exports = function (app) {
  app.use(express.json());
  app.use(
    session({
      secret: "mySecret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/user", user);
  app.use(cors());
};
