const express = require("express");
const cors = require("cors");
const postsRouter = require("./controllers/posts");
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use(postsRouter);

//Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
