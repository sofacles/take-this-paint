import mongoose from "mongoose";

const ZipCodeFactory = (connectedMongoose) => {
  const ZipCodeSchema = new connectedMongoose.Schema({
    zip: { type: String },
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
  });

  const ZipCodeModel = connectedMongoose.model(
    "ZipCodeSchema",
    ZipCodeSchema,
    "zipCode"
  );

  return {
    ZipCodeSchema,
    ZipCodeModel,
  };
};

export default ZipCodeFactory;
