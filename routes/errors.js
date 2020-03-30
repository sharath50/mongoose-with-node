let router = require("express").Router();
let User = require("../models/userModel");

router.post("/user/method1", async (req, res) => {
  let { name, password } = req.body;
  try {
    let result = await new User({ name, password }).save();
    return res.send(result);
  } catch (err) {
    res.send(err);
    // to get all errors from mongoose
    for (feild in err.errors) {
      console.log(err.errors[feild].message);
    }
  }
});

module.exports = router;
