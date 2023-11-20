import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

function handleNonInitialConnectionError(error) {
  console.log("Error with connection to MongoDB.. not initial connection:");
  console.info(error);
}

mongoose.set("bufferCommands", false);

mongoose.connection.on("error", handleNonInitialConnectionError);

// CONNECTION EVENTS
// When successfully connected
const onConnectedHandler = function () {
  console.log("Mongoose default connection open to " + process.env.MONGO_URI);
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
mongoose.connect(process.env.MONGO_URI, {
  authSource: process.env.MONGO_AUTH_SOURCE,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
});

const onConnected = (cb) => {
  mongoose.connection.on("connected", () => cb(mongoose));
};

const Connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.on("connected", () => {
      resolve(mongoose);
    });
    mongoose.connection.on("error", (err) => {
      reject(err);
    });
  });
};

export default Connect;
