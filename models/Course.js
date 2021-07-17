const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const courseSchema = new Schema({
  titulo: String,
  descripcion: String,
  etiquetas: [String],
  detalles: [String],
  content: [String],
  price: Number,
});

courseSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Course = model("Course", courseSchema);

module.exports = Course;
