import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

import User from "./Models/user";
import databaseConnection from "./Database/db.js";

const app = express();
app.use(cors());
app.use(express.json());

databaseConnection().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
  });
});

app.post("/user/login", async (req, res) => {
  //validate these!
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(401).send("Incorrect Username or Password");
  }
  const verified = await bcrypt.compare(password, user.password);
  if (!verified) {
    return res.status(401).send("Incorrect Username or Password");
  }
  return res.status(200).send({ username });
});

app.post("/user", async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    await User.create({ username: username, password: hash });
  } catch (err) {
    console.log(err);
    if (err.code == 11000) {
      return res.status(409).send("Usename already taken");
    } else {
      return res.status(400).send("Invalid Username and/or Password");
    }
  }
  return res.status(201).send({ username });
});
