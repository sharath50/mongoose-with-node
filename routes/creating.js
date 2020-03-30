let router = require("express").Router();
let User = require("../models/userModel");

/*
*** creating the documents
new User()
insertOne()
create()
insertMany()
*/

// for counting the docs
var countQuery = model.where({ color: "black" }).count();
var countQuery = model.where({ color: "black" }).countDocuments();

// creates the document and saves the document and gives the saved doc as result
router.post("/user/method1", async (req, res) => {
  let {
    name,
    age,
    graduation,
    skills,
    friends,
    creditCard,
    more,
    chats
  } = req.body;
  try {
    let result = await new User({
      name,
      age,
      graduation,
      skills,
      friends,
      creditCard,
      more,
      chats
    }).save();
    return res.send(result);
  } catch (err) {
    res.send(err);
    // to get all errors from mongoose
    for (feild in err.errors) {
      console.log(err.errors[feild].message);
    }
  }
});

// inserts the doc and gives performed operation info and docs as result
router.post("/user/method2", async (req, res) => {
  let { name, age, friends } = req.body;
  try {
    let user = await User.collection.insertOne({ name, age, friends });
    return res.send(user);
  } catch (err) {
    res.send(err);
  }
});

// creates the docs and gives docs as the result
router.post("/user/method3", async (req, res) => {
  let { users } = req.body;
  try {
    let result = await User.create(users[0], users[1]);
    return res.send(result);
  } catch (err) {
    res.send(err);
  }
});

// creates the docs and gives docs as the result
router.post("/user/method4", async (req, res) => {
  let { users } = req.body;
  try {
    let result = await User.create(users);
    return res.send(result);
  } catch (err) {
    res.send(err);
  }
});

// inserts the doc and gives array of docs as result
router.post("/user/method5", async (req, res) => {
  let { users } = req.body;
  try {
    let result = await User.insertMany(users);
    let ids = [];
    for (i of result) {
      ids.push(i._id);
    }
    return res.send(result);
  } catch (err) {
    res.send(err);
  }
});

// inserts the doc and gives total performed operation info and array of docs as result
router.post("/user/method6", async (req, res) => {
  let { users } = req.body;
  try {
    let result = await User.collection.insertMany(users);
    return res.send(result);
  } catch (err) {
    res.send(err);
  }
});

// validating in mongoose
router.post("/user/method7", async (req, res) => {
  try {
    User.validate(err => {
      if (err) {
        // some logic goes here
        // intead of doing that in catch (err) block
      }
    });
    let result = await User.collection.insertMany(users);
    return res.send(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;

// command to import the data to mongodb using command line
// mongoimport --db <db-name> --collection <collection-name> --file <json-file-name.json> --jsonArray

// json file contains below
// [
//   {"_id":"5a68fdc3615eda645bc6bdec","tags":["express","backend"],"date":"2018-01-24T21:42:27.388Z","name":"Express.js Course","author":"Mosh","isPublished":true,"price":10,"__v":0},
//   {"_id":"5a68fdd7bee8ea64649c2777","tags":["node","backend"],"date":"2018-01-24T21:42:47.912Z","name":"Node.js Course","author":"Mosh","isPublished":true,"price":20,"__v":0},
//   {"_id":"5a68fde3f09ad7646ddec17e","tags":["aspnet","backend"],"date":"2018-01-24T21:42:59.605Z","name":"ASP.NET MVC Course","author":"Mosh","isPublished":true,"price":15,"__v":0},
//   {"_id":"5a68fdf95db93f6477053ddd","tags":["react","frontend"],"date":"2018-01-24T21:43:21.589Z","name":"React Course","author":"Mosh","isPublished":false,"__v":0},
//   {"_id":"5a68fe2142ae6a6482c4c9cb","tags":["node","backend"],"date":"2018-01-24T21:44:01.075Z","name":"Node.js Course by Jack","author":"Jack","isPublished":true,"price":12,"__v":0},
//   {"_id":"5a68ff090c553064a218a547","tags":["node","backend"],"date":"2018-01-24T21:47:53.128Z","name":"Node.js Course by Mary","author":"Mary","isPublished":false,"price":12,"__v":0},
//   {"_id":"5a6900fff467be65019a9001","tags":["angular","frontend"],"date":"2018-01-24T21:56:15.353Z","name":"Angular Course","author":"Mosh","isPublished":true,"price":15,"__v":0}
// ]

// refer all mongodb operators
// https://docs.mongodb.com/manual/reference/operator/query/
