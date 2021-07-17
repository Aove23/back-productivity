const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const userExtractor = require("../middlewares/userExtractor");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

usersRouter.get("/", async (request, response) => {
  console.log("Hola entre!");
  //Sacar userId del request
  // const { userId } = request;
  // console.log(userId);

  // .populate("courses", {
  //   price: 0,
  //   detalles: 0,
  // });

  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id, {
    content: 1,
  }).populate("courses", {
    price: 0,
    detalles: 0,
  });
  console.log(user);
  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
