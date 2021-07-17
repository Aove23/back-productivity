const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.passwordHash;
  },
});

const User = model("User", userSchema);

module.exports = User;
