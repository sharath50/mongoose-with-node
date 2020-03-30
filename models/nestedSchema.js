let mongoose = require("mongoose");

// validation in mongoose
/**
 * type : data type
 * required : boolean
 * return : function() { return this.isPublished }
 * unique : boolean
 * default : " "
 * minlength : 5
 * maxlength : 255
 * match : /pattern/
 * enum : ["web", "mobile", "network"] // value should be one of these
 * alias : "another name for reference"
 */

/**
 * // for numbers
 * min
 * max
 */

const PracticeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"] // value must one of these
  },
  author: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    validate: {
      // writing custom validators
      validator: function(v) {
        return v && v.length > 0;
      },
      // this is the error message we will get
      message: "a course should have atleast one tag"
    }
  },
  tags2: {
    type: Array,
    validate: {
      // writing custom async validators
      isAsync: true,
      validator: function(v, cb) {
        setTimeout(() => {
          let result = v && v.length > 0;
          cb(result);
        }, 2000);
      },
      // this is the error message we will get
      message: "a course should have atleast one tag"
    }
  },
  isPublished: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: function() {
      // if the course is published then price is required true
      return this.isPublished;
    },
    min: 5,
    max: 10
  }
});

// properties schema type objects
const PracticeSchema1 = new mongoose.Schema({
  forAllType: {
    type: String, //
    required: true,
    required: function() {
      if (true) {
        return true;
      }
    },
    alias: "anything", // the key name is now 'anything' in db
    unique: false,
    default: " ",
    enum: ["web", "mobile", "network"],
    validate: {
      // writing custom validators
      validator: function(v) {
        return v && v.length > 0;
      },
      // this is the error message we will get
      message: "a course should have atleast one tag"
    },
    get: v => Math.round(v), // this will round the value while getting the data from db
    set: v => Math.round(v) // this will round the value while saving the data to db
  },
  forString: {
    minlength: 5,
    maxlength: 255,
    lowercase: true,
    uppercase: false,
    trim: true // removes empty padding chars
  },
  forNumber: {
    min: 5,
    max: 10
  }
});

// references in schemas
// normalization -> for consistancy
let authors = {
  name: "Mosh"
};

let course = {
  author: authors.name
};

// denormalization -> good performance
let course = {
  author: {
    name: "Mosh"
  }
};

// hybrid method -> good performance and consistancy
let course = {
  author: {
    id: "reference",
    name: "Mosh"
  }
  // store name directly bacause the name is used so many times
  // and have id reference also if we need more info then we can
  // fetch the data by using the id reference
};

let coursesSchema = new mongoose.Schema({
  name: String,
  author: {
    // to put reference of other doc objectId
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
});

let AuthorSchema = new mongoose.Schema({
  name: String
});

let Course = mongoose.model("Course", CoursesSchema);
let Author = mongoose.model("Author", AuthorSchema);

async function func() {
  await Course.find().select("name author");
  // this function gives name and author id
}

async function func1() {
  await Course.find()
    .populate("author")
    .select("name author");
  // using .populate("author") method to fetch the author
  // using author id
  // now this function gives author document with the result
}

async function func11() {
  await Course.find().populate({
    // if authours is an array of objectID then like below we can filter the result
    path: "authors",
    // `match` and `sort` apply to the Author model,
    // not the Book model. These options do not affect
    // which documents are in `books`, just the order and
    // contents of each book document's `authors`.
    match: { name: new RegExp(".*h.*", "i") },
    sort: { name: -1 }
  });
}

async function func2() {
  await Course.find()
    .populate("author", "name -_id")
    .select("name author");
  // using second argument as "name -_id" we can get name
  // excluding _id from author doc
}

async function func3() {
  await Course.find()
    .populate("author", "name -_id")
    .populate("category", "name")
    .select("name author");
  // we can populate multiple sub docs like above
  // by using multiple .populate chain methods
}

// subdocuments
let DocSchema = new mongoose.Schema({
  name: String,
  // if want to specify multiple schema arguments like require
  // we can mention SubdocSchema as value of type property
  other: {
    type: SubdocSchema,
    required: true
  }
});

let SubdocSchema = new mongoose.Schema({
  name: String
});

// transaction operation in mongoose
/*
transaction is all about while performing a group of operation 
if any one operation fails all remaining operations will roll back
to previous state
*/
// 'Two Phase Commit' is the concept we need to use for mongodb

// for that we can use this npm module
// npm i fawn

// NOTE : no need to worry about bellow thing
// this module create a collection in db to work
// it creates a collection while doing the multiple operation
// after transaction completes it deletes the temp collection it created before

const Fawn = require("fawn");
Fawn.init(mongoose);

(async function() {
  try {
    new Fawn.Task()
      .save("users", User) // first operation
      .update(
        "movies",
        { _id: movie._id }, // finding to update
        {
          $inc: { number: -1 } // increment
        }
      ) // second operation
      .run(); // this method should call
  } catch (ex) {
    console.log(ex);
  }
})();

// ObjectID in mongoDB

// it is generated by mongoDB -> driver
// _id : 5a724953ab83547957541e6a

// 12 bytes
// 4 bytes : timestamp
// 3 bytes : machine identifier
// 2 bytes : process identifier
// 3 bytes : counter

// generating ObjectID
let id = new mongoose.Types.ObjectId();
console.log(id);

// validation of mongoDB ObjectID
console.log(mongoose.Types.ObjectId.isValid("1234")); // false

// handling if the user send invalid object id then validate it using validator
// bellow npm module is for extending the support of joi for objectId
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

let schema = {
  // then we can use .objectId() method
  id: Joi.objectId().required()
};
Joi.validate(req.body, schema);

// better implementation
