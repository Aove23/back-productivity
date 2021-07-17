const postsRouter = require("express").Router();
const Post = require("../models/Post");

const posts = [
  {
    id: 1,
    descripcion: "ultima tecnologia web afdafsgdsgdgreherhg",
    etiquetas: [],
    imagen: "https://i.ibb.co/B4g038m/119-working.png",
    titulo: "Reactjs",
  },
  {
    id: 2,
    descripcion: "ultima tecnologia web afdafsgdsgdgreherhg",
    etiquetas: "app Reactjs",
    imagen: "https://i.ibb.co/Cwxd7MN/118-macbook.png",
    titulo: "Sveltejs",
  },
  {
    id: 3,
    descripcion: "ultima tecnologia web afdafsgdsgdgreherhg",
    etiquetas: [],
    imagen: "https://i.ibb.co/QMWp6s2/105-freelancer.png",
    titulo: "Vuejs",
  },
  {
    id: 4,
    descripcion: "ultima tecnologia web afdafsgdsgdgreherhg",
    etiquetas: [],
    imagen: "https://i.ibb.co/LzV2s5z/103-gym-time.png",
    titulo: "Angularjs",
  },
  {
    id: 5,
    descripcion: "ultima tecnologia web afdafsgdsgdgreherhg",
    etiquetas: [],
    imagen: "https://i.ibb.co/RgtgrZs/day42-imac.png",
    titulo: "Backbonejs",
  },
];

// postsRouter.get("/", (request, response) => {
//   response.send("Hello Expressjs!");
// });

postsRouter.get("/", async (request, response) => {
  const posts = await Post.find({});
  response.json(posts);
});

postsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const { titulo, descripcion, imagen, etiquetas } = body;

  if (
    titulo === "" ||
    titulo === undefined ||
    descripcion === "" ||
    descripcion === undefined
  ) {
    return response.status(400).json({ error: "content missing" });
  }

  const post = new Post({
    descripcion: descripcion,
    etiquetas: etiquetas,
    imagen: imagen,
    titulo: titulo,
    fecha: new Date(),
  });

  try {
    const savedPost = await post.save();
    response.json(savedPost);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

// postsRouter.get("/api/posts/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const post = posts.find((post) => post.id === id);
//   response.json(post);
// });

module.exports = postsRouter;
