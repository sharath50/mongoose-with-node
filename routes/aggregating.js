let router = require("express").Router();
let User = require("../models/userModel");

// getting the distinct docs
router.get("/user/method1", async (req, res) => {
  try {
    let user = await User.distinct("age");
    res.send({ no: user, total: user.length });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
