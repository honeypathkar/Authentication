const express = require("express");
const UserModel = require("./models/UserModel");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/userRegister", upload.single("image"), async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const newUser = new UserModel({
      name,
      username,
      email,
      password,
      image: req.file.buffer.toString("base64"),
      contentType: req.file.mimetype,
    });

    await newUser.save();
    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
