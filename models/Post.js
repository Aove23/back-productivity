const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const postSchema = new Schema({
  descripcion: String,
  etiquetas: [String],
  imagen: String,
  titulo: String,
  fecha: Date,
});

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
