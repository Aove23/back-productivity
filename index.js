require("dotenv").config();
require("./mongo.js");

const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");
const postsRouter = require("./controllers/posts");
const usersRouter = require("./controllers/users");
const coursesRouter = require("./controllers/courses");
const addRouter = require("./controllers/addCourse");
const loginRouter = require("./controllers/login");
const checkoutRouter = require("./controllers/checkout");

//Middlewares
app.use(cors());
app.use(express.json());

//Middlewares Routes
app.use("/api/posts", postsRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/add", addRouter);
app.use("/api/course", checkoutRouter);

//Middlewares Errors
app.use(notFound);
app.use(handleErrors);

//Port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
