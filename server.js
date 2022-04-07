require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3001;
const jwt = require("jsonwebtoken");
app.use(express.json());

const posts = [
  { username: "khalil", title: "Post Title 1" },
  { username: "khalil", title: "Post Title 2" },
  { username: "ahmad", title: "Post Title 2" },
  { username: "ali", title: "Post Title 3" },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
  // res.json({ data: posts });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken, user: username });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Helper Function
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
