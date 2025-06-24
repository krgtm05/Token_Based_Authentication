const express = require("express");
const app = express();
app.use(express.json()); //middleware used for reading json data from body
const users = [];


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
//sign in rout
app.post("/signin", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) res.send("Signed in done");
  else res.send("Invalid credentials");
});

app.listen(3000);
