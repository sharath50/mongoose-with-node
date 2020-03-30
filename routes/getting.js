let router = require("express").Router();
let User = require("../models/userModel");

/**
*** finding the documents
Model.find()
Model.findOne()
Model.findById()
*/

// to get multiple docs which matches
router.get("/user/method1/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let user = await User.find({ name: name }, "name age");
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

// to get first one which matches
router.get("/user/method2/:age", async (req, res) => {
  let { age } = req.params;
  try {
    let user = await User.findOne({ age: age }, "-name -age -friends");
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

// to get docs using objectId
router.get("/user/method3/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let user = await User.findById(id, "name");
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

// getting the count of docs
router.get("/user/method4", async (req, res) => {
  try {
    let user = await User.countDocuments("name");
    // Collection.countDocuments -- gives total count and gives conditional count
    // Collection.estimatedDocumentCount -- gives total no of documents
    res.send({ no: user });
  } catch (err) {
    res.send(err);
  }
});

// getting the count of docs with condition
router.get("/user/method5/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let user = await User.where({ name: name }).countDocuments();
    // OR with multiple conditions
    // let user = await User.countDocuments({ name: name, age: age });
    // let user = await User.find({ name: name, age: age }).count();
    res.send({ no: user });
  } catch (err) {
    res.send(err);
  }
});

// getting the distinct docs
router.get("/user/method6", async (req, res) => {
  try {
    // let user = await User.find().distinct("age");
    let user = await User.distinct("age");
    res.send({ no: user, total: user.length });
  } catch (err) {
    res.send(err);
  }
});

// finding from subdocuments
router.post("/user/method7", async (req, res) => {
  let { id, chatId } = req.body;
  let user = await User.findById(id, "chats");
  let chat = await user.chats.id(chatId);
  res.send(chat);
});

// finding from subdocument subdocuments
router.post("/user/method8", async (req, res) => {
  let { id, chatId, threadId } = req.body;
  let user = await User.findById(id, "chats");
  // use "chats" like this because we are only looking for chat and thread so don't take all the data
  let chat = await user.chats.id(chatId);
  let thread = await chat.threads.id(threadId);
  res.send(thread);
});

// limiting and sorting according to key name ASC and DESC
router.post("/user/method9", async (req, res) => {
  const courses = await Course.find({ author: "node", isPublished: true })
    .limit(10)
    .sort({ name: 1, tags: 1 /* for DESC -1 */ })
    // .sort("name") // for DESC "-name"
    .select({ name: 1, tags: 1 }); // to get only name and tags
  // .select("name tags") // to get only name and tags
});

// comparison query operators in mongoose
/**
 * eq  (equal)
 * ne  (not equal)
 * gt  (greater than)
 * gte (greater than or equal to)
 * lt  (less than)
 * lte (less than or equal to)
 * in  (in)
 * nin (not in)
 */
router.post("/user/method10", async (req, res) => {
  const courses = await Course.find({ price: { $gt: 10 } }) // to get greater than 10
    // { price: { $eq : 10 } } //
    // { price: { $gte : 10, $lte : 20 } } // to get between 10 and 20
    // { price: { $in : [ 10 , 20 , 30] } } // price is 10 or 20 or 30
    .limit(10)
    .sort({ name: 1 /* -1 for desc */ })
    .select({ name: 1, tags: 1 }); // to get only name and tags
});

// logical query operators
/**
 * or
 * and
 * not
 * nor
 */
router.post("/user/method11", async (req, res) => {
  const courses = await Course.find()
    .or([{ author: "sharath" }, { isPublished: true }]) // courses author is sharath or isPublished true
    // .and([{ author: "sharath" }, { isPublished: true }]) // courses author is sharath and isPublished false
    .limit(10)
    .sort({ name: 1 /* -1 for desc */ })
    .select({ name: 1, tags: 1 }); // to get only name and tags
});

// regular expression
router.post("/user/method12", async (req, res) => {
  const courses = await Course.find({ author: /^sharath/i }) // starts with sharath, i case insensitive
    // {author : /sharath$/g } // ends with sharath, g global
    // {author : /.*sharath.*/i } // conatains with sharath, i case insensitive
    .limit(10)
    .sort({ name: 1 /* -1 for desc */ })
    .select({ name: 1, tags: 1 }); // to get only name and tags

  // OR

  // User.findOne( {name : { $regex : `${name}`, $options : 'ig' }}, cb);
});

// skipping for pagination
router.post("/user/method13", async (req, res) => {
  let pageNo = 2; // page no is 1 or 2 or 3
  let pageSize = 10; // every page contains 10 documents
  const courses = await Course.find({ author: /^sharath/i })
    .skip((pageNumber - 1) * pageSize) // this will skip 10 documents
    .limit(pageSize); // this will gives 10 documents after skipping
  // if the page size is 3 it skips 20 docs skip((3 - 1) * pageSize)
  // as pagesize is 10 gives 10 more docs from 21 to 30
});

// refer all mongodb operators
// https://docs.mongodb.com/manual/reference/operator/query/

module.exports = router;
