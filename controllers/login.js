const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/User");

loginRouter.get("/:username", async (request, response) => {
  const parametro = request.params;
  const { username } = parametro;
  console.log(username);
  response.json({ exit: username });
});

loginRouter.post("/", async (request, response) => {
  const { body } = request;
  const { username, password } = body;

  const user = await User.findOne({ username });
  console.log(user);

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      status: "invalid user or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.json({ username: user.username, name: user.name, token });
});

module.exports = loginRouter;
