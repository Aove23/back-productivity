const coursesRouter = require("express").Router();
const Course = require("../models/Course");

coursesRouter.get("/", async (request, response) => {
  const courses = await Course.find({}, { content: 0 });
  response.json(courses);
});

coursesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const { titulo, descripcion, etiquetas, detalles, content, price } = body;

  const course = new Course({
    titulo,
    descripcion,
    etiquetas,
    detalles,
    content,
    price,
  });

  try {
    const savedCourse = await course.save();

    response.json(savedCourse);
  } catch (err) {
    next(err);
  }
});

module.exports = coursesRouter;
