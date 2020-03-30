// getting the mongoose module from npm_modules
const mongoose = require("../config/connection1");
const Schema = mongoose.Schema;

let SubSchema = new Schema({
  body: String,
  status: Number,
  threads: [
    {
      body: String,
      status: Number
    }
  ]
});

let UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  age: {
    type: Number,
    default: 0
  },
  graduation: {
    graduated: {
      type: Boolean,
      default: false
    },
    percentage: {
      type: Number,
      default: 0.0
    },
    employed: {
      type: Boolean,
      default: false
    }
  },
  skills: [
    {
      skill: String,
      level: {
        type: String,
        default: "low"
      }
    }
  ],
  friends: [String],
  creditCard: {
    type: String,
    default: "0000 0000 0000 1111"
  },
  more: {
    gender: String,
    place: String,
    favorites: {
      cinema: [String],
      food: [String]
    }
  },
  chats: [SubSchema]
});

let User = (module.exports = mongoose.model("User", UserSchema));
