const mongoose = require("./config/connection");

// mongoose API for data collection
/*
    new Model()
    Model.collection.insertOne()
    Model.create()
    Model.insertMany()
    Model.collection.insertMany()

    Model.find()
    Model.findOne()
    Model.findById()

    Model.deleteOne()
    Model.deleteMany()
    Model.findOneAndDelete()
    Model.findByIdAndDelete()

    Model.remove()
    Model.findOneAndRemove()
    Model.findByIdAndRemove()

    Model.replaceOne()
    Model.findOneAndReplace()
    
    Model.update()
    Model.updateOne()
    Model.updateMany()
    Model.findOneAndUpdate()
    Model.findByIdAndUpdate()
*/

// model()
// `UserModel` is a "Model", a subclass of `mongoose.Model`.
const UserModel = mongoose.model("User", new Schema({ name: String }));
// You can use a Model to create new documents using `new`:
const userDoc = new UserModel({ name: "Foo" });
await userDoc.save();
// You also use a model to create queries:
const userFromDb = await UserModel.findOne({ name: "Foo" });

// Model.createCollection()
var userSchema = new Schema({ name: String });
var User = mongoose.model("User", userSchema);
User.createCollection().then(function(collection) {
  console.log("Collection is created!");
});

// Model.aggregate()
// Find the max balance of all accounts
Users.aggregate([
  { $group: { _id: null, maxBalance: { $max: "$balance" } } },
  { $project: { _id: 0, maxBalance: 1 } }
]).then(function(res) {
  console.log(res); // [ { maxBalance: 98000 } ]
});
// Or use the aggregation pipeline builder.
Users.aggregate()
  .group({ _id: null, maxBalance: { $max: "$balance" } })
  .project("-id maxBalance")
  .exec(function(err, res) {
    if (err) return handleError(err);
    console.log(res); // [ { maxBalance: 98 } ]
  });

// Model.count()
Adventure.count({ type: "jungle" }, function(err, count) {
  if (err) console.log(err);
  console.log("there are %d jungle adventures", count);
});
var countQuery = model.where({ color: "black" }).count();

// Model.countDocuments()
Adventure.countDocuments({ type: "jungle" }, function(err, count) {
  console.log("there are %d jungle adventures", count);
});
var countQuery = model.where({ color: "black" }).countDocuments();

// If you want to count all documents in a large collection, use the estimatedDocumentCount()
const numAdventures = Adventure.estimatedDocumentCount();

// Model.create()
// pass a spread of docs and a callback
Candy.create({ type: "jelly bean" }, { type: "snickers" }, function(
  err,
  jellybean,
  snickers
) {
  if (err) err; // ...
});

// pass an array of docs
var array = [{ type: "jelly bean" }, { type: "snickers" }];
Candy.create(array, function(err, candies) {
  if (err) err; // ...

  var jellybean = candies[0];
  var snickers = candies[1];
  // ...
});

// callback is optional; use the returned promise if you like:
var promise = Candy.create({ type: "jawbreaker" });
promise.then(function(jawbreaker) {
  // ...
});

// delete many
// deletes all which matches condition
Character.deleteMany({ name: /Stark/, age: { $gte: 18 } }, function(err) {});

// Model.deleteOne()
// delete first one which matches the codition
Character.deleteOne({ name: "Eddard Stark" }, function(err) {});

// Model.distinct()
// to get distict values(not repeated and unique values even multiple document have same values)
// bellow example gives an array of url which has clicks greater than 100
Link.distinct("url", { clicks: { $gt: 100 } }, function(err, result) {
  if (err) return handleError(err);
  assert(Array.isArray(result)); // true
  console.log("unique urls with more than 100 clicks", result);
});
var query = Link.distinct("url");
query.exec(callback);

// Model.events
MyModel.events.on("error", err => console.log(err.message));
// Prints a 'CastError' because of the above handler
await MyModel.findOne({ _id: "notanid" }).catch(noop);

// Model.exists()
// to see whether name 'picard' exists or not
await Character.deleteMany({});
await Character.create({ name: "Jean-Luc Picard" });
await Character.exists({ name: /picard/i }); // true
await Character.exists({ name: /riker/i }); // false

//--------------------------------------------------------------------------------------------
// Model.find()
/* finding the document using any property */
Model.find();

// named john and at least 18
MyModel.find({ name: "john", age: { $gte: 18 } });

// executes, passing results to callback
MyModel.find({ name: "john", age: { $gte: 18 } }, function(err, docs) {});

// executes, name LIKE john and only selecting the "name" and "friends" fields
MyModel.find({ name: /john/i }, "name friends", function(err, docs) {});

// passing options
MyModel.find({ name: /john/i }, null, { skip: 10 });

// passing options and executes
MyModel.find({ name: /john/i }, null, { skip: 10 }, function(err, docs) {});

// executing a query explicitly
var query = MyModel.find({ name: /john/i }, null, { skip: 10 });
query.exec(function(err, docs) {});

// using the promise returned from executing a query
var query = MyModel.find({ name: /john/i }, null, { skip: 10 });
var promise = query.exec();
promise.addBack(function(err, docs) {});

// Model.findOne();
// find one iphone adventures - iphone adventures??
Adventure.findOne({ type: "iphone" }, function(err, adventure) {});

// same as above
Adventure.findOne({ type: "iphone" }).exec(function(err, adventure) {});

// select only the adventures name
Adventure.findOne({ type: "iphone" }, "name", function(err, adventure) {});

// same as above
Adventure.findOne({ type: "iphone" }, "name").exec(function(err, adventure) {});

// specify options, in this case lean
Adventure.findOne({ type: "iphone" }, "name", { lean: true }, callback);

// same as above
Adventure.findOne({ type: "iphone" }, "name", { lean: true }).exec(callback);

// chaining findOne queries (same as above)
Adventure.findOne({ type: "iphone" })
  .select("name")
  .lean()
  .exec(callback);

// Model.findById();
// find adventure by id and execute
Adventure.findById(id, function(err, adventure) {});

// same as above
Adventure.findById(id).exec(callback);

// select only the adventures name and length
Adventure.findById(id, "name length", function(err, adventure) {});

// same as above
Adventure.findById(id, "name length").exec(callback);

// include all properties except for `length`
Adventure.findById(id, "-length").exec(function(err, adventure) {});

// passing options (in this case return the raw js objects, not mongoose documents by passing `lean`
Adventure.findById(id, "name", { lean: true }, function(err, doc) {});

// same as above
Adventure.findById(id, "name")
  .lean()
  .exec(function(err, doc) {});

//--------------------------------------------------------------------------------------------

// Model.deleteOne()
Character.deleteOne({ name: "Eddard Stark" }, function(err) {});
/*
Deletes the first document that matches conditions from the collection. 
Behaves like remove(), but deletes at most one document regardless of the single option.
*/

// Model.deleteMany()
Character.deleteMany({ name: /Stark/, age: { $gte: 18 } }, function(err) {});
/*
Deletes all of the documents that match conditions from the collection. Behaves like remove(), 
but deletes all documents that match conditions regardless of the single option.
*/

// Model.findOneAndDelete()
A.findOneAndDelete(conditions, options, callback); // executes
A.findOneAndDelete(conditions, options); // return Query
A.findOneAndDelete(conditions, callback); // executes
A.findOneAndDelete(conditions); // returns Query
A.findOneAndDelete(); // returns Query

/*
options : 
    sort: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
    maxTimeMS: puts a time limit on the query - requires mongodb >= 2.6.0
    select: sets the document fields to return
    projection: like select, it determines which fields to return, ex. { projection: { _id: 0 } }
    rawResult: if true, returns the raw result from the MongoDB driver
    strict: overwrites the schema's strict mode option for this update
*/

// Model.findByIdAndDelete()
// findByIdAndDelete(id) is a shorthand for findOneAndDelete({ _id: id })

//--------------------------------------------------------------------------------------------

// Model.remove()
const res = await Character.remove({ name: "Eddard Stark" });
res.deletedCount; // Number of documents removed

// Model.findOneAndRemove()
A.findOneAndRemove(conditions, options, callback); // executes
A.findOneAndRemove(conditions, options); // return Query
A.findOneAndRemove(conditions, callback); // executes
A.findOneAndRemove(conditions); // returns Query
A.findOneAndRemove(); // returns Query

// Model.findByIdAndRemove()
Model.findByIdAndRemove(id, options, callback); // executes
Model.findByIdAndRemove(id, options); // return Query
Model.findByIdAndRemove(id, callback); // executes
Model.findByIdAndRemove(id); // returns Query
Model.findByIdAndRemove(); // returns Query

/*
options : 
    sort: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
    maxTimeMS: puts a time limit on the query - requires mongodb >= 2.6.0
    select: sets the document fields to return
    projection: like select, it determines which fields to return, ex. { projection: { _id: 0 } }
    rawResult: if true, returns the raw result from the MongoDB driver
    strict: overwrites the schema's strict mode option for this update
*/

//--------------------------------------------------------------------------------------------

// Model.update()
MyModel.update({ age: { $gt: 18 } }, { oldEnough: true }, fn);
const res = await MyModel.update({ name: "Tobi" }, { ferret: true });
res.n; // Number of documents that matched `{ name: 'Tobi' }`
// Number of documents that were changed. If every doc matched already
// had `ferret` set to `true`, `nModified` will be 0.
res.nModified;

var query = { name: "borne" };
Model.update(query, { name: "jason bourne" }, options, callback);
// is sent as
Model.update(query, { $set: { name: "jason bourne" } }, options, function(
  err,
  res
) {});
// if overwrite option is false. If overwrite is true, sent without the $set wrapper.

// Model.updateOne()
const res = await Person.updateOne(
  { name: "Jean-Luc Picard" },
  { ship: "USS Enterprise" }
);
res.n; // Number of documents matched
res.nModified; // Number of documents modified

// Model.updateMany()
const res = await Person.updateMany({ name: /Stark$/ }, { isDeleted: true });
res.n; // Number of documents matched
res.nModified; // Number of documents modified

// Model.findOneAndUpdate()
A.findOneAndUpdate(conditions, update, options, callback); // executes
A.findOneAndUpdate(conditions, update, options); // returns Query
A.findOneAndUpdate(conditions, update, callback); // executes
A.findOneAndUpdate(conditions, update); // returns Query
A.findOneAndUpdate(); // returns Query

/*
options : 
    new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    upsert: bool - creates the object if it doesn't exist. defaults to false.
    fields: {Object|String} - Field selection. Equivalent to .select(fields).findOneAndUpdate()
    maxTimeMS: puts a time limit on the query - requires mongodb >= 2.6.0
    sort: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
    runValidators: if true, runs update validators on this command. Update validators validate the update operation against the model's schema.
    setDefaultsOnInsert: if this and upsert are true, mongoose will apply the defaults specified in the model's schema if a new document is created. This option only works on MongoDB >= 2.4 because it relies on MongoDB's $setOnInsert operator.
    rawResult: if true, returns the raw result from the MongoDB driver
    strict: overwrites the schema's strict mode option for this update
*/

// Model.findByIdAndUpdate()
Model.findByIdAndUpdate(id, update, options, callback); // executes
Model.findByIdAndUpdate(id, update, options); // returns Query
Model.findByIdAndUpdate(id, update, callback); // executes
Model.findByIdAndUpdate(id, update); // returns Query
Model.findByIdAndUpdate(); // returns Query

Model.findByIdAndUpdate(id, { name: "jason bourne" }, options, callback);
// is sent as
Model.findByIdAndUpdate(
  id,
  { $set: { name: "jason bourne" } },
  options,
  callback
);

// we can update the doc - find and update a value and save()
Model.findById(id, function(err, doc) {
  if (err) err;
  doc.name = "jason bourne";
  doc.save(callback);
});

/*
options : 
    new: bool - true to return the modified document rather than the original. defaults to false
    upsert: bool - creates the object if it doesn't exist. defaults to false.
    runValidators: if true, runs update validators on this command. Update validators validate the update operation against the model's schema.
    setDefaultsOnInsert: if this and upsert are true, mongoose will apply the defaults specified in the model's schema if a new document is created. This option only works on MongoDB >= 2.4 because it relies on MongoDB's $setOnInsert operator.
    sort: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
    select: sets the document fields to return
    rawResult: if true, returns the raw result from the MongoDB driver
    strict: overwrites the schema's strict mode option for this update
*/

//--------------------------------------------------------------------------------------------

// Model.findOneAndReplace()
A.findOneAndReplace(conditions, options, callback); // executes
A.findOneAndReplace(conditions, options); // return Query
A.findOneAndReplace(conditions, callback); // executes
A.findOneAndReplace(conditions); // returns Query
A.findOneAndReplace(); // returns Query

/*
options : 
    sort: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
    maxTimeMS: puts a time limit on the query - requires mongodb >= 2.6.0
    select: sets the document fields to return
    projection: like select, it determines which fields to return, ex. { projection: { _id: 0 } }
    rawResult: if true, returns the raw result from the MongoDB driver
    strict: overwrites the schema's strict mode option for this update
*/

//--------------------------------------------------------------------------------------------

// Model.replaceOne()
const res = await Person.replaceOne({ _id: 24601 }, { name: "Jean Valjean" });
res.n; // Number of documents matched
res.nModified; // Number of documents modified

// Model.findOneAndReplace()
A.findOneAndReplace(conditions, options, callback); // executes
A.findOneAndReplace(conditions, options); // return Query
A.findOneAndReplace(conditions, callback); // executes
A.findOneAndReplace(conditions); // returns Query
A.findOneAndReplace(); // returns Query

/*
options : 
    sort: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
    maxTimeMS: puts a time limit on the query - requires mongodb >= 2.6.0
    select: sets the document fields to return
    projection: like select, it determines which fields to return, ex. { projection: { _id: 0 } }
    rawResult: if true, returns the raw result from the MongoDB driver
    strict: overwrites the schema's strict mode option for this update
*/
