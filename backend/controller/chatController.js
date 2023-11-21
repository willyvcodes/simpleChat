const User = require("../models/Users");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const { password: userPassword, ...parsedUser } = user.toObject();
    res.json(parsedUser);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User Already Exists" });
    }
    user = new User({
      firstname,
      lastname,
      username,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};
