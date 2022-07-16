const jwt = require("jsonwebtoken");
const express = require("express");

//MIDDLEWARES
module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("access denied");
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      res.send({ Error: err });
    } else {
      console.log(decoded);
      next();
    }
  });
};
