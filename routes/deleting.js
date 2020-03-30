let router = require("express").Router();
let User = require("../models/userModel");

/**
 * deleting routers starts from here
 */
/*
*** deleting the documents
  Model.deleteOne()
  Model.deleteMany()
  Model.findOneAndDelete()
  Model.findByIdAndDelete()
*/

// deletes only one doc and gives performed operation info
router.delete("/user/method1/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let user = await User.deleteOne({ name: name });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

// deletes many docs which matches condition and gives performed operation info
router.delete("/user/method2/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let user = await User.deleteMany({ name: name });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

// deletes only one doc and gives deleted doc as result
router.delete("/user/method3/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let user = await User.findOneAndDelete({ name: name });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

// deletes only one doc using id and gives deleted doc as result
router.delete("/user/method4/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
