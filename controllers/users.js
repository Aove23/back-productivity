const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersRouter = require("express").Router();
const User = require("../models/User");
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
  // Hay que validar que el usuario no exista en DB
  // const user = await User.findOne({ email });
  // console.log(user);
  const flagRegister = "Register by credentials"
  const body = request.body;


  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    email: body.email,
    name: body.name,
    lastName: body.lastName,
    auth: flagRegister,
    avatar: body.avatar || null,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
