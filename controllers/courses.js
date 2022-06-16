const coursesRouter = require("express").Router();
const Course = require("../models/Course");

coursesRouter.get("/", async (request, response) => {
  const courses = await Course.find({}, { content: 0 });
  response.json(courses);
});

coursesRouter.get("/:courseId", async (req, res) => {
  const id = req.params.courseId;
  try {
    if (!id) return res.status(404).send({ message: "El producto no existe" });
    const course = await Course.findById(id, {
      content: 0,
    });
    res.json(course);
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

coursesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const { titulo, descripcion, category, etiquetas, detalles, content, price } =
    body;

  const course = new Course({
    titulo,
    descripcion,
    category,
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
