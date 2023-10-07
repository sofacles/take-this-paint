import mongoose from "mongoose";
import { configType } from "../../config/types";
import config from "../../config/config";

const _config: configType = config.dev;

function handleNonInitialConnectionError(error) {
  console.log("Error with connection to MongoDB.. not initial connection:");
  console.info(error);
}

mongoose.set("bufferCommands", false);

mongoose.connection.on("error", handleNonInitialConnectionError);

// CONNECTION EVENTS
// When successfully connected
const onConnectedHandler = function () {
  console.log("Mongoose default connection open to " + _config.dbURI);
  return mongoose;
};

mongoose.connection.on("connected", onConnectedHandler);

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

console.log("about to connect to mongodb");
mongoose.connect(_config.dbURI, {
  authSource: _config.authSource,
  user: _config.user,
  pass: _config.pass,
});

const onConnected = (cb) => {
  mongoose.connection.on("connected", () => cb(mongoose));
};

export { onConnected };
