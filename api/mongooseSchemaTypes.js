// getting the mongoose module from npm_modules
const mongoose = new require("mongoose");
const Schema = mongoose.Schema;

let link_here = "https://mongoosejs.com/docs/schematypes.html";

// schema types in mpngoose
/*
    String
    Number
    Date
    Buffer
    Boolean
    Mixed
    ObjectId
    Array
    Decimal128
    Map
*/

let exampleSchema1 = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65 },
  mixed: {
    type: mongoose.Schema.Types.Mixed
  },
  _someId: mongoose.Schema.Types.ObjectId,
  decimal: mongoose.Schema.Types.Decimal128,
  array: {
    type: Array
  },
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [mongoose.Schema.Types.Mixed],
  ofObjectId: [mongoose.Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  },
  map: Map,
  mapOfString: {
    type: mongoose.Schema.type.Map,
    of: String
  }
});

/*
var Thing = mongoose.model('Thing', schema);
var m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = Buffer.alloc(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new mongoose.Types.ObjectId;
m.array.push(1);
m.ofString.push("strings!");
m.ofNumber.unshift(1,2,3,4);
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.map = new Map([['key', 'value']]);
m.save(callback);
*/

let example1 = (module.exports.example1 = mongoose.model(
  "User",
  exampleSchema1
));

/*
/// can be used on all schema types

required: boolean or function, if true adds a required validator for this property
default: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.
select: boolean, specifies default projections for queries
validate: function, adds a validator function for this property
get: function, defines a custom getter for this property using Object.defineProperty().
set: function, defines a custom setter for this property using Object.defineProperty().
alias: string, mongoose >= 4.10.0 only. Defines a virtual with the given name that gets/sets this path.
*/

/*
/// indexes

index: boolean, whether to define an index on this property.
unique: boolean, whether to define a unique index on this property.
sparse: boolean, whether to define a sparse index on this property.
*/

/*
/// strings

lowercase: boolean, whether to always call .toLowerCase() on the value
uppercase: boolean, whether to always call .toUpperCase() on the value
trim: boolean, whether to always call .trim() on the value
match: RegExp, creates a validator that checks if the value matches the given regular expression
enum: Array, creates a validator that checks if the value is in the given array.
minlength: Number, creates a validator that checks if the value length is not less than the given number
maxlength: Number, creates a validator that checks if the value length is not greater than the given number
*/

/*
/// numbers

min: Number, creates a validator that checks if the value is greater than or equal to the given minimum.
max: Number, creates a validator that checks if the value is less than or equal to the given maximum.
enum: Array, creates a validator that checks if the value is strictly equal to one of the values in the given array.
*/

/*
/// dates

min: Date
max: Date
*/

/// string ---------------->

const schema1 = new Schema({ name: String }); // name will be cast to string
const schema2 = new Schema({ name: "String" }); // Equivalent
const Person = mongoose.model("Person", schema2);

new Person({ name: 42 }).name; // "42" as a string
new Person({ name: { toString: () => 42 } }).name; // "42" as a string

// "undefined", will get a cast error if you `save()` this document
let p = new Person({
  name: {
    foo: 42
  }
}).name;

/// numbers ---------------->
const schema1 = new Schema({ age: Number }); // age will be cast to a Number
const schema2 = new Schema({ age: "Number" }); // Equivalent
const Car = mongoose.model("Car", schema2);

new Car({ age: "15" }).age; // 15 as a Number
new Car({ age: true }).age; // 1 as a Number
new Car({ age: false }).age; // 0 as a Number
new Car({ age: { valueOf: () => 83 } }).age; // 83 as a Number

/// dates ---------------->
var Assignment = mongoose.model("Assignment", { dueDate: Date });

Assignment.findOne(function(err, doc) {
  doc.dueDate.setMonth(3);
  doc.save(callback); // THIS DOES NOT SAVE YOUR CHANGE

  doc.markModified("dueDate"); // do it before saving, this is only for dates
  doc.save(callback); // works
});

/// buffer ---------------->
const schema1 = new Schema({ binData: Buffer }); // binData will be cast to a Buffer
const schema2 = new Schema({ binData: "Buffer" }); // Equivalent

const Data = mongoose.model("Data", schema2);

const file1 = new Data({ binData: "test" }); // {"type":"Buffer","data":[116,101,115,116]}
const file2 = new Data({ binData: 72987 }); // {"type":"Buffer","data":[27]}
const file4 = new Data({ binData: { type: "Buffer", data: [1, 2, 3] } }); // {"type":"Buffer","data":[1,2,3]}

/// mixed ---------------->
const Any = new Schema({ any: {} });
const Any = new Schema({ any: Object });
const Any = new Schema({ any: Schema.Types.Mixed });
const Any = new Schema({ any: mongoose.Mixed });
// Note that by default, if you're using `type`, putting _any_ POJO as the `type` will
// make the path mixed.
const Any = new Schema({
  any: {
    type: { foo: String }
  } // "any" will be Mixed - everything inside is ignored.
});
// However, as of Mongoose 5.8.0, this behavior can be overridden with typePojoToMixed.
// In that case, it will create a single nested subdocument type instead.
const Any = new Schema(
  {
    any: {
      type: { foo: String }
    } // "any" will be a single nested subdocument.
  },
  { typePojoToMixed: false }
);

person.anything = { x: [3, 4, { y: "changed" }] };
person.markModified("anything");
person.save(); // Mongoose will save changes to `anything`.

/// ObjectIds ---------------->
const carSchema = new mongoose.Schema({ driver: mongoose.ObjectId });

const Car = mongoose.model("Car", carSchema);

const car = new Car();
car.driver = new mongoose.Types.ObjectId();

typeof car.driver; // 'object'
car.driver instanceof mongoose.Types.ObjectId; // true

car.driver.toString(); // Something like "5e1a0651741b255ddda996c4"

/// boolean ---------------->
/*
true , 'true' , 1 , '1' , 'yes
false , 'false' , 0 , '0' , 'no'

Any other value causes a CastError. You can modify what values Mongoose converts to true
or false using the convertToTrue and convertToFalse properties, which are JavaScript sets.

*/

const M = mongoose.model("Test", new Schema({ b: Boolean }));
console.log(new M({ b: "nay" }).b); // undefined

// Set { false, 'false', 0, '0', 'no' }
console.log(mongoose.Schema.Types.Boolean.convertToFalse);

mongoose.Schema.Types.Boolean.convertToFalse.add("nay");
console.log(new M({ b: "nay" }).b); // false

/// array ---------------->
var ToySchema = new Schema({ name: String });
var ToyBoxSchema = new Schema({
  toys: [ToySchema],
  buffers: [Buffer],
  strings: [String],
  numbers: [Number]
  // ... etc
});

// Arrays are special because they implicitly have a default value of [] (empty array).
var ToyBox = mongoose.model("ToyBox", ToyBoxSchema);
console.log(new ToyBox().toys); // []

// To overwrite this default, you need to set the default value to undefined
var ToyBoxSchema = new Schema({
  toys: {
    type: [ToySchema],
    default: undefined
  }
});

// Note: specifying an empty array is equivalent to Mixed. The following all create arrays of Mixed:
var Empty1 = new Schema({ any: [] });
var Empty2 = new Schema({ any: Array });
var Empty3 = new Schema({ any: [Schema.Types.Mixed] });
var Empty4 = new Schema({ any: [{}] });

/// maps ---------------->
const userSchema = new Schema({
  // `socialMediaHandles` is a map whose values are strings. A map's
  // keys are always strings. You specify the type of values using `of`.
  socialMediaHandles: {
    type: Map,
    of: String
  }
});

const User = mongoose.model("User", userSchema);
// Map { 'github' => 'vkarpov15', 'twitter' => '@code_barbarian' }
console.log(
  new User({
    socialMediaHandles: {
      github: "vkarpov15",
      twitter: "@code_barbarian"
    }
  }).socialMediaHandles
);

const user = new User({
  socialMediaHandles: {}
});

// Good
user.socialMediaHandles.set("github", "vkarpov15");
// Works too
user.set("socialMediaHandles.twitter", "@code_barbarian");
// Bad, the `myspace` property will **not** get saved
user.socialMediaHandles.myspace = "fail";

// 'vkarpov15'
console.log(user.socialMediaHandles.get("github"));
// '@code_barbarian'
console.log(user.get("socialMediaHandles.twitter"));
// undefined
user.socialMediaHandles.github;

// Will only save the 'github' and 'twitter' properties
user.save();

/// getters ---------------->
/*
use getters for storing relative path url's like bellow
*/
const root = "https://s3.amazonaws.com/mybucket";

const userSchema = new Schema({
  name: String,
  picture: {
    type: String,
    get: v => `${root}${v}`
  }
});

const User = mongoose.model("User", userSchema);
const doc = new User({ name: "Val", picture: "/123.png" });
doc.picture; // 'https://s3.amazonaws.com/mybucket/123.png'
doc.toObject({ getters: false }).picture; // '123.png'

// use this bellow trick if we want to do it for nested doc or array
const schema = new Schema({
  arr: [{ url: String }]
});
const root = "https://s3.amazonaws.com/mybucket";
// Good, do this instead of declaring a getter on `arr`
schema.path("arr.0.url").get(v => `${root}${v}`);

// The `schema.path()` Function
/*
  The schema.path() function returns the instantiated schema type for a given path.
*/
var sampleSchema = new Schema({ name: { type: String, required: true } });
console.log(sampleSchema.path("name"));
// Output looks like:
/**
 * SchemaString {
 *   enumValues: [],
 *   regExp: null,
 *   path: 'name',
 *   instance: 'String',
 *   validators: ...
 */

// to not to create _id for subdocuments
var subSchema = mongoose.Schema(
  {
    //your subschema content
  },
  { _id: false }
);
var schema = mongoose.Schema({
  // schema content
  subSchemaCollection: [subSchema]
});
var model = mongoose.model("tablename", schema);
