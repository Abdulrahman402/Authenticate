const bcrypt = require("bcryptjs");
const storage = require("code-storage");

const User = require("../Models/User");

exports.signUp = async (req, res) => {
  // Check that user sent at least one of login options (phone, email or username)
  if (
    (!req.body.username && !req.body.email && !req.body.phone) ||
    !req.body.password
  ) {
    return res.status(400).send("Required fields are missed!");
  }

  // Validate body of the request
  const { error } = storage.validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let query = req.body;

  let password = query.password;
  delete query.password;

  // check if this user already exists
  let user = await User.findOne(query);
  if (user) return res.status(400).send("User already registered");

  query["password"] = password;
  // Storing this user as new user
  user = new User(query);

  // Hashing its password and save it to DB
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(query.password, salt);
  await user.save();

  // Generate new token for this user
  const token = await user.generateAuthToken();

  res.json({ user: user, token: token });
};
