let router = require("express").Router();
let mongoose = require("mongoose");

/**
 * query object in mongoose
 */
const query = MyModel.find(); // `query` is an instance of `Query`
query.setOptions({ lean: true });
query.collection(MyModel.collection);
query
  .where("age")
  .gte(21)
  .exec(callback);

// You can instantiate a query directly. There is no need to do
// this unless you're an advanced user with a very good reason to.
const query = new mongoose.Query();
// Query
// Query()

// Query.prototype.$where()
query.$where("this.comments.length === 10 || this.name.length === 5");
// or
query.$where(function() {
  return this.comments.length === 10 || this.name.length === 5;
});

// Query.prototype.Symbol.asyncIterator()

// Query.prototype.all()
MyModel.find()
  .where("pets")
  .all(["dog", "cat", "ferret"]);
// Equivalent:
MyModel.find().all("pets", ["dog", "cat", "ferret"]);

// Query.prototype.and()
query.and([{ color: "green" }, { status: "ok" }]);

// Query.prototype.batchSize()
// Query.prototype.box()
// Query.prototype.cast()
// Query.prototype.catch()
// Query.prototype.center()
// Query.prototype.centerSphere()
// Query.prototype.circle()
// Query.prototype.collation()
// Query.prototype.comment()
// Query.prototype.count()
// Query.prototype.countDocuments()
// Query.prototype.cursor()
// Query.prototype.deleteMany()
// Query.prototype.deleteOne()
// Query.prototype.distinct()
// Query.prototype.elemMatch()
// Query.prototype.equals()
// Query.prototype.error()
// Query.prototype.estimatedDocumentCount()
// Query.prototype.exec()
var promise = query.exec();
var promise = query.exec("update");

query.exec(callback);
query.exec("find", callback);

// Query.prototype.exists()
// { name: { $exists: true }}
Thing.where("name").exists();
Thing.where("name").exists(true);
Thing.find().exists("name");

// { name: { $exists: false }}
Thing.where("name").exists(false);
Thing.find().exists("name", false);

// Query.prototype.explain()
// Query.prototype.find()
// Query.prototype.findOne()
// Query.prototype.findOneAndDelete()
// Query.prototype.findOneAndRemove()
// Query.prototype.findOneAndReplace()
// Query.prototype.findOneAndUpdate()
// Query.prototype.geometry()
// Query.prototype.get()
// Query.prototype.getFilter()
// Query.prototype.getOptions()
// Query.prototype.getPopulatedPaths()
// Query.prototype.getQuery()
// Query.prototype.getUpdate()

// Query.prototype.gt()
// Query.prototype.gte()
// Query.prototype.lt()
// Query.prototype.lte()
Thing.find()
  .where("age")
  .gt(21);
// or
Thing.find().gt("age", 21);

// Query.prototype.in()
// Query.prototype.nin()

// Query.prototype.hint()
// Query.prototype.intersects()
// Query.prototype.j()
// Query.prototype.lean()
// Query.prototype.limit()
// Query.prototype.map()
// Query.prototype.maxDistance()
// Query.prototype.maxScan()
// Query.prototype.maxTimeMS()
// Query.prototype.maxscan()
// Query.prototype.merge()
// Query.prototype.mod()
// Query.prototype.mongooseOptions()
// Query.prototype.mongooseOptions()
// Query.prototype.ne()
// Query.prototype.near()
// Query.prototype.nearSphere()
// Query.prototype.nor()
query.nor([{ color: "green" }, { status: "ok" }]);

// Query.prototype.or()
query.or([{ color: "red" }, { status: "emergency" }]);

// Query.prototype.orFail()
// Throws if no doc returned
await Model.findOne({ foo: "bar" }).orFail();
// Throws if no document was updated
await Model.updateOne({ foo: "bar" }, { name: "test" }).orFail();
// Throws "No docs found!" error if no docs match `{ foo: 'bar' }`
await Model.find({ foo: "bar" }).orFail(new Error("No docs found!"));
// Throws "Not found" error if no document was found
await Model.findOneAndUpdate({ foo: "bar" }, { name: "test" }).orFail(() =>
  Error("Not found")
);

// Query.prototype.polygon()
// Query.prototype.populate()
// Query.prototype.projection()
// Query.prototype.read()
// Query.prototype.readConcern()
// Query.prototype.regex()
// Query.prototype.remove()
// Query.prototype.replaceOne()
// Query.prototype.select()
// Query.prototype.selected()
// Query.prototype.selectedExclusively()
// Query.prototype.selectedInclusively()
// Query.prototype.session()
// Query.prototype.set()
// Query.prototype.setOptions()
// Query.prototype.setQuery()
// Query.prototype.setUpdate()
// Query.prototype.size()
// Query.prototype.skip()
// Query.prototype.slaveOk()
// Query.prototype.slice()
// Query.prototype.snapshot()
// Query.prototype.sort()
// Query.prototype.tailable()
// Query.prototype.then()
// Query.prototype.toConstructor()
// Query.prototype.update()
// Query.prototype.updateMany()
// Query.prototype.updateOne()
// Query.prototype.use$geoWithin
// Query.prototype.w()
// Query.prototype.where()
// Query.prototype.within()
// Query.prototype.wtimeout()

/**
 * model object methods
 */
let model = mongoose.model("doc", { name: { type: String } } /* schema*/); // model
document = new doc({}); // document
model.aggregate();
// Model
// Model()
// Model.aggregate()
// Model.bulkWrite()
// Model.cleanIndexes()
// Model.count()
// Model.countDocuments()
// Model.create()
// Model.createCollection()
// Model.createIndexes()
// Model.deleteMany()
// Model.deleteOne()
// Model.discriminator()
// Model.distinct()
// Model.ensureIndexes()
// Model.estimatedDocumentCount()
// Model.events
// Model.exists()
// Model.find()
// Model.findById()
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndRemove()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.geoSearch()
// Model.hydrate()
// Model.init()
// Model.insertMany()
// Model.inspect()
// Model.listIndexes()
// Model.mapReduce()
// Model.populate()
// Model.prototype.$where
// Model.prototype.$where()
// Model.prototype.base
// Model.prototype.baseModelName
// Model.prototype.collection
// Model.prototype.db
// Model.prototype.delete
// Model.prototype.deleteOne()
// Model.prototype.discriminators
// Model.prototype.increment()
// Model.prototype.model()
// Model.prototype.modelName
// Model.prototype.remove()
// Model.prototype.save()
// Model.prototype.schema
// Model.remove()
// Model.replaceOne()
// Model.startSession()
// Model.syncIndexes()
// Model.translateAliases()
// Model.update()
// Model.updateMany()
// Model.updateOne()
// Model.validate()
// Model.watch()
// Model.where()

/**
 *  new document object methods
 */
let model = mongoose.model("doc", {
  name: { type: String, default: "noName" } // schema
}); // model
document = new model({}); // document
document.$isDefault("name"); // true, the name property contains default name new doc({}) is empty
// Document
// Document.prototype.$ignore()
// Document.prototype.$isDefault()
// Document.prototype.$isDeleted()
// Document.prototype.$isEmpty()
// Document.prototype.$locals
// Document.prototype.$markValid()
// Document.prototype.$op
// Document.prototype.$session()
// Document.prototype.$set()
// Document.prototype.depopulate()
// Document.prototype.directModifiedPaths()
// Document.prototype.equals()
// Document.prototype.errors
// Document.prototype.execPopulate()
// Document.prototype.get()
// Document.prototype.id
// Document.prototype.init()
// Document.prototype.inspect()
// Document.prototype.invalidate()
// Document.prototype.isDirectModified()
// Document.prototype.isDirectSelected()
// Document.prototype.isInit()
// Document.prototype.isModified()
// Document.prototype.isNew
// Document.prototype.isSelected()
// Document.prototype.markModified()
// Document.prototype.modifiedPaths()
// Document.prototype.overwrite()
// Document.prototype.populate()
// Document.prototype.populated()
// Document.prototype.replaceOne()
// Document.prototype.save()
// Document.prototype.schema
// Document.prototype.set()
// Document.prototype.toJSON()
// Document.prototype.toObject()
// Document.prototype.toString()
// Document.prototype.unmarkModified()
// Document.prototype.update()
// Document.prototype.updateOne()
// Document.prototype.validate()
// Document.prototype.validateSync()

/**
 * schema methods
 */
const schema = new Schema({ name: String }); // schema
model = mongoose.model("user", schema); // model
doc = new model({}); // document

// Schematype;
// SchemaType();
// SchemaType.cast();
// SchemaType.checkRequired();
// SchemaType.get();
// SchemaType.prototype.default();
// SchemaType.prototype.get();
// SchemaType.prototype.immutable();
// SchemaType.prototype.index();
// SchemaType.prototype.ref();
// SchemaType.prototype.required();
// SchemaType.prototype.select();
// SchemaType.prototype.set();
// SchemaType.prototype.sparse();
// SchemaType.prototype.text();
// SchemaType.prototype.unique();
// SchemaType.prototype.validate();
// SchemaType.set();

module.exports = router;
