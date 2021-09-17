// Required packages
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Requiring user model
const User = require("../Models/User");

module.exports = passport = async (passport) => {
  passport.use(
    new localStrategy({}, async (username, password, done) => {
      // check what user uses to login in (phone, email or username) and declare it to username of passport.
      if (username.includes("@")) email = username;
      else if (username.match(/^[0-9]+$/) != null) phone = username;
      else username = username;

      //   Fining this user in check if exists.
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "User is not found" });

      // Validating the password of this user
      const validPW = await bcrypt.compare(password, user.password);
      if (!validPW) return done(null, false, { message: "Invalid password" });

      //   Generate a new token for the user.
      const token = await user.generateAuthToken();

      return done(null, user, token);
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => await User.findOne({ id: id }));
};
