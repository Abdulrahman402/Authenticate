// required packages

const passport = require("passport");
require("dotenv").config();
const express = require("express");

const app = express();

// Needed middlewares
require("./Middlewares/passport")(passport);
require("./Startup/Routes")(app);
require("./Startup/DB");

// Welcoming home message
app.get("/", async (req, res) => res.send("Welcome to Qurba"));

// Running Server
const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
