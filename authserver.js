require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 4001;
const jwt = require("jsonwebtoken");
app.use(express.json());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });

  return accessToken;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
