// getting the mongoose module from npm_modules
const mongoose = require("mongoose");

// see connection options for production level app
// https://mongoosejs.com/docs/connections.html

// connecting to the mongo database...
mongoose
  .set("bufferCommands", false) // to disable buffering globally
  .set("autoCreate", false) // if true it causes buffering again so set it to false
  .set("useCreateIndex", true)
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes automatic
    reconnectTries: Number.MAX_VALUE, // Never stops trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err)); // to handle error on initial connection

mongoose.connection.on("error", err => {
  // to handle errors after initial connection
  logError(err);
});

var conn = mongoose;
conn.config; // to configure the connection
conn.collections; // get collections
conn.db; // get db name
conn.host; // get host name
conn.id; // the number identifier of the connection
conn.get("test"); // Gets the value of the option key. Equivalent to conn.options[key]
conn.modelNames(); // Returns an array of model names created on this connection.
conn.name || mongoose.createConnection("mongodb://localhost:27017/mydb").name; // "mydb"

// creating a collection
conn.createCollection("collection name here", () => {
  console.log("collection created");
});

// delete collection
conn.dropCollection();

// delete database
conn.dropDatabase();

// to create the model
var mongoose = require("mongoose");
var db = mongoose.createConnection();
db.model("Venue", new Schema());
var Ticket = db.model("Ticket", new Schema());
var Venue = db.model("Venue");

// to get models
var conn = mongoose.createConnection();
var Test = conn.model("Test", mongoose.Schema({ name: String }));

Object.keys(conn.models).length; // 1
conn.models.Test === Test; // true

// to delete the model
conn.model("User", new Schema({ name: String }));
console.log(conn.model("User")); // Model object
conn.deleteModel("User");
console.log(conn.model("User")); // undefined

// Usually useful in a Mocha `afterEach()` hook
afterEach(function() {
  conn.deleteModel(/.+/); // Delete every model
});

// to close the collection
mongoose.connection.close(() => {
  console.log("connection closed");
});

/**
 * connection object methods
 */
// Connection
// Connection()
// Connection.prototype.close()
// Connection.prototype.collection()
// Connection.prototype.collections
// Connection.prototype.config
// Connection.prototype.createCollection()
// Connection.prototype.db
// Connection.prototype.deleteModel()
// Connection.prototype.dropCollection()
// Connection.prototype.dropDatabase()
// Connection.prototype.get()
// Connection.prototype.host
// Connection.prototype.id
// Connection.prototype.model()
// Connection.prototype.modelNames()
// Connection.prototype.models
// Connection.prototype.name
// Connection.prototype.openUri()
// Connection.prototype.pass
// Connection.prototype.plugin()
// Connection.prototype.plugins
// Connection.prototype.port
// Connection.prototype.readyState
// Connection.prototype.set()
// Connection.prototype.startSession()
// Connection.prototype.useDb()
// Connection.prototype.user
// Connection.prototype.watch()
