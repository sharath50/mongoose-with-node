// getting the mongoose module from npm_modules
const mongoose = require("mongoose");

// making connection to the database
mongoose
  .set("useCreateIndex", true)
  .set("useNewUrlParser", true)
  .set("useUnifiedTopology", true)
  .set("useFindAndModify", false)
  .connect(process.env.DB_HOST, {})
  .then(() => console.log("MongoDB Connected successfully"))
  .catch(err => console.log(err));

mongoose.connection.on("error", err => {
  logError(err);
});

module.exports = mongoose;
