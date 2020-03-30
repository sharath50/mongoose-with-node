let router = require("express").Router();
let User = require("../models/userModel");

/**
 * routes start from here
 */
// pushing single items into array
router.put("/user/method1", (req, res) => {
  let { id, friend } = req.body;
  User.findByIdAndUpdate(
    id,
    { $push: { friends: friend } },
    { new: true },
    (err, user) => {
      res.send(user);
    }
  );
});

// pushing multiple items into array from friends[]
router.put("/user/method2", (req, res) => {
  let { id, friends } = req.body;
  User.findByIdAndUpdate(
    id,
    { $push: { friends: { $each: friends } } },
    { new: true },
    (err, user) => {
      res.send(user);
    }
  );
});

// updating a property value
router.put("/user/method3", (req, res) => {
  let { id, age } = req.body;
  User.findByIdAndUpdate(
    id,
    { $set: { age: age } },
    { new: true },
    (err, user) => {
      res.send(user);
    }
  );
});

// updating property value by fiding and setting using result object
router.put("/user/method4", async (req, res) => {
  let { id, age } = req.body;
  let user = await User.findById(id);
  user.age = age;
  // OR
  // user.set({age:age})
  user.save((err, user) => {
    if (!err && user) {
      res.send(user);
    }
  });
});

// updating a subdocument property
router.put("/user/method5", async (req, res) => {
  let { id, chatId, status } = req.body;
  let user = await User.findById(id);
  let chat = await user.chats.id(chatId);
  chat.status = status;
  user.markModified("chats");
  user.save((err, result) => {
    if (!err && result) {
      res.send({
        chat: chat
      });
    } else {
      res.send(err);
    }
  });
});

// if the subdocument is not an array then, there is no finding, so we can do like this
async function example() {
  let course = await User.update(
    { id: _id },
    { $set: { "subdoc.name": "sharath" } },
    { new: true }
  );
}

// can directly delete properties like this
async function example4() {
  let course = await User.update(
    { id: _id },
    { $unset: { "subdoc.name": "" } }, // this removes the name in subdoc
    // { $unset: { "subdoc": "" } }, // this removes the entire subdoc
    { new: true }
  );
}

// pushing an item inside subdocument array
router.put("/user/method5", async (req, res) => {
  let { id, chatId, data } = req.body;
  let user = await User.findById(id);
  let chat = await user.chats.id(chatId);
  chat.threads.push(data);
  user.markModified("chats");
  user.save((err, result) => {
    if (!err && result) {
      res.send({
        chat: chat,
        last: chat.threads[chat.threads.length - 1]._id
      });
    } else {
      res.send(err);
    }
  });
});

// update property inside subdocument
router.put("/user/method6", async (req, res) => {
  let { id, chatId, threadId, status } = req.body;
  let user = await User.findById(id);
  let chat = await user.chats.id(chatId);
  let thread = chat.threads.id(threadId);
  thread.status = status;
  user.markModified("chats");
  user.save((err, result) => {
    if (!err && result) {
      res.send({
        thread: thread
      });
    } else {
      res.send(err);
    }
  });
});

/*
*** updating the document using mongoose methods
  Model.update();
  Model.updateOne();
  Model.updateMany();
  Model.findOneAndUpdate();
  Model.findByIdAndUpdate();
*/
// updates only first one by condition and gives performed operation info
router.put("/user/method7", async (req, res) => {
  let { name, age } = req.body;
  try {
    let update = await User.update({ name }, { age }, { new: true });
    res.send(update);
  } catch (err) {
    res.send(err);
  }
});

// can directly delete two or more properties like this
async function example2() {
  Courses.update(
    { _id: id },
    {
      $unset: {
        author: "",
        books: ""
      }
    },
    { new: true }
  );
}

// can update directly two or more properties like this
async function example3() {
  Courses.update(
    { _id: id },
    {
      $unset: {
        author: "sharath",
        books: "node.js"
      }
    },
    { new: true }
  );
}

// updates only first one by condition and gives performed operation info
// no difference between above and this one as i seen
router.put("/user/method8", async (req, res) => {
  let { name, age } = req.body;
  try {
    let update = await User.updateOne({ name }, { age }, { new: true });
    res.send(update);
  } catch (err) {
    res.send(err);
  }
});

// updates all docs by condition and gives performed operation info
router.put("/user/method9", async (req, res) => {
  let { name, age } = req.body;
  try {
    let update = await User.updateMany({ name }, { age });
    res.send(update);
  } catch (err) {
    res.send(err);
  }
});

// updates only first one by condition and gives updated doc
router.put("/user/method10", async (req, res) => {
  let { name, age } = req.body;
  try {
    let update = await User.findOneAndUpdate({ name }, { age }, { new: true });
    res.send(update);
  } catch (err) {
    res.send(err);
  }
});

// finds by id and updates only one and gives updated doc
router.put("/user/method11", async (req, res) => {
  let { id, age } = req.body;
  try {
    let update = await User.findByIdAndUpdate(id, { age });
    res.send(update);
  } catch (err) {
    res.send(err);
  }
});

// refer all mongodb operators
// https://docs.mongodb.com/manual/reference/operator/query/

module.exports = router;
