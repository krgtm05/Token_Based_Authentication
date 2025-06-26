const express = require("express");
const app = express();
app.use(express.json()); //middleware used for reading json data from body
const users = [];

//function to generate custom token
function generateToken() {
  const options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let token = "";
  for (let i = 0; i < 50; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}
//Sign up route
app.post("/signup", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  for (let user of users) {
    if (user.username === username) {
      res.send("User already exist");
      return;
    }
  }
  users.push({
    username: username,
    password: password,
  });
  res.send("Signed Up Successfully");
});
//sign in route
app.post("/signin", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  const token = generateToken();
  for (let user of users) {
    if (user.username === username && user.password === password) {
      user.token = token;
      res.send(token);
      return;
    }
  }
  res.send("Invalid Credentials");
});
//me route
app.get("/me", function (req, res) {
  const token = req.headers["token"];
  for (let user of users) {
    if (user.token === token) {
      res.json({
        username: user.username,
        password: user.password,
      });
      return;
    }
  }
  res.send("Not found");
});

module.exports = app
// app.listen(3000);
