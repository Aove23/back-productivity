const addRouter = require("express").Router();
const User = require("../models/User");

addRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const { userId, courseId } = body;
  const user = await User.findById(userId);

  try {
    user.courses = user.courses.concat(courseId);
    const savedUser = await user.save();

    response.json(savedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = addRouter;
