const mongoose = require("mongoose");

const { MONGO_DB_URI } = process.env;

//Conexion a MongoDB
mongoose
  .connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connect");
  })
  .catch((err) => {
    console.log(err);
  });

process.on("uncaughtException", () => {
  mongoose.disconnect();
});
