const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
app.use(express.json()); //middleware used for reading json data from body

const users = [];

//function to generate custom token
// function generateToken() {
//   const options = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ];
//   let token = "";
//   for (let i = 0; i < 50; i++) {
//     token += options[Math.floor(Math.random() * options.length)];
//   }
//   return token;
// }

//JWT Based auth
const JWT_SECRET = "afdgfhgdklsdfdgfbkkfdlfsdkfbf";

//auth middleware
function auth(req, res, next) {
  const token = req.headers.token; //jwt
  const decodedInformation = jwt.verify(token, JWT_SECRET); // this will return the json that we had encoded i.e., eg:- {username:gautam-ku}
  if (decodedInformation.username) {
    req.username = decodedInformation.username;
    next();
  } else {
    req.json({
      Message: "You are not logged in",
    });
  }
}
//cors resolution - hosting frontend on tha same host as backend //localhost:3000
app.use(express.static(path.join(__dirname, "Public")));

// ✅ Serve index.html on root
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

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

  for (let user of users) {
    if (user.username === username && user.password === password) {
      // const token = generateToken();
      const token = jwt.sign(
        {
          username: username,
        },
        JWT_SECRET
      );
      res.send(token);
      return;
    }
  }
  res.send("Invalid Credentials");
});

//me route
app.get("/me", auth, function (req, res) {
  for (let user of users) {
    if (user.username === req.username) {
      res.json({
        username: user.username,
        password: user.password,
      });
      return;
    }
  }
  res.send("Not found");
});

module.exports = app;
// app.listen(3000);
