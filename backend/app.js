require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const authMiddleware = require("./middleware/auth.middleware");

const roleMiddleware = require("./middleware/role.middleware");

const generateToken = require("./utils/generateToken");

const app = express();

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "./db/db.json");

const readDb = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));

const writeDb = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

app.post("/api/signup", (req, res) => {
  const { fullName, mobileNumber, role, email, password } = req.body;

  const db = readDb();

  const existingUser = db.users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  const newUser = {
    id: Date.now(),
    fullName,
    mobileNumber,
    role,
    email,
    password,
  };

  db.users.push(newUser);

  writeDb(db);

  const token = generateToken(newUser);

  res.status(201).json({
    message: "Signup Success",
    token,
    role: newUser.role,
    user: newUser,
  });
});

app.post("/api/login", (req, res) => {

  const {
    email,
    password
  } = req.body;

  const db = readDb();

  const user =
    db.users.find(
      u =>
        u.email === email &&
        u.password === password
    );

  if (!user) {

    return res.status(401).json({
      message: "Invalid Username or Password"
    });

  }

  const token =generateToken(user);

  res.json({
    token,
    role: user.role,
    user
  });

});

module.exports = app;
