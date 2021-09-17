const express = require("express");
const passport = require("passport");

const router = express.Router();

const signUp = require("../Controllers/signUp");

router.post("/signUp", signUp.signUp);

router.post(
  "/logIn",
  passport.authenticate("local", {
    successRedirect: "/",
    failureFlash: true,
  })
);

module.exports = router;
