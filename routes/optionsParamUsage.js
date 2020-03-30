let router = require("express").Router();
let User = require("../models/userModel");

/**
 * routes start from here
 */
/*
*** effective usage of options parameter in different scenerio in mongoose

*/
router.get("/user/method1", (req, res) => {
  let {} = req.query;
});

router.get("/user/method2", (req, res) => {
  let {} = req.query;
});

router.get("/user/method3", (req, res) => {
  let {} = req.query;
});

router.get("/user/method4", (req, res) => {
  let {} = req.query;
});

router.get("/user/method5", (req, res) => {
  let {} = req.query;
});

router.get("/user/method6", (req, res) => {
  let {} = req.query;
});

module.exports = router;

// refer all mongodb operators
// https://docs.mongodb.com/manual/reference/operator/query/
