const router = require("express").Router();
const verify = require("./verifyToken");
router.get("/posts", verify, (req, res) => {
  res.send({
    posts: { title: "my first post", description: "idk what i am doing" },
  });
});

module.exports = router;
