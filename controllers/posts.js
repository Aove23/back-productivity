const postsRouter = require("express").Router();

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
  {
    id: 6,
    descripcion: "ultima tecnologia web afdafsgdsgdgreherhg",
    etiquetas: [],
    imagen: "urlimg",
    titulo: "Nextjs",
  },
  {
    id: 7,
    descripcion: "ultima tecnologia web afdafsgdsgdgreherhg",
    etiquetas: [],
    imagen: "urlimg",
    titulo: "Gatsbyjs",
  },
  {
    id: 8,
    descripcion: "ultima tecnologia web afdafsgdsgdgreherhg",
    etiquetas: [],
    imagen: "urlimg",
    titulo: "Nodejs",
  },
  {
    id: 9,
    descripcion: "ultima tecnologia web afdafsgdsgdgreherhg",
    etiquetas: [],
    imagen: "urlimg",
    titulo: "JavaScript",
  },
];

postsRouter.get("/", (request, response) => {
  response.send("Hello Expressjs!");
});

postsRouter.get("/api/posts", (request, response) => {
  response.json(posts);
});

postsRouter.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const post = posts.find((post) => post.id === id);
  response.json(post);
});

postsRouter.use((request, response) => {
  response.status(404).json({
    error: "Not found",
  });
});

module.exports = postsRouter;
