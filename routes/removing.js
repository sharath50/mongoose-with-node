let router = require("express").Router();
let User = require("../models/userModel");

/**
 * routes start from here
 */
/*
*** removing the documents
  Model.remove()
  Model.findOneAndRemove()
  Model.findByIdAndRemove()
*/

// removes multiple docs which matches condition and gives performed operation info
router.delete("/user/method1/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let user = await User.remove({ name: name });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

// removes the only one doc and gives removed doc info
router.delete("/user/method2/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let user = await User.findOneAndRemove({ name: name });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

// finds by id and removes the only one doc and gives removed doc info
router.delete("/user/method3/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let user = await User.findByIdAndRemove(id);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

/**
 * removing from sub documents
 */
router.post("/user/method4", async (req, res) => {
  let { id, otherId } = req.body;
  let user = await User.findById(id);
  await user.other.id(otherId).remove();
  user.save((err, result) => {
    if (!err && result) {
      res.send("deleted successfully");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;

// refer all mongodb operators
// https://docs.mongodb.com/manual/reference/operator/query/
