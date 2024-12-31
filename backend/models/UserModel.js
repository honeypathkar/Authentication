const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/authentication", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false, // Optional if not always provided
  },
  contentType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
