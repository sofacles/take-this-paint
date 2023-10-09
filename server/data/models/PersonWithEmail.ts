const PersonWithEmailFactory = (connectedMongoose) => {
  const PersonWithEmailSchema = new connectedMongoose.Schema({
    email: { type: String },
    secret: { type: String },
  });
  const PersonWithEmailModel = connectedMongoose.model(
    "PersonWithEmailSchema",
    PersonWithEmailSchema,
    "personWithEmail"
  );

  return {
    PersonWithEmailSchema,
    PersonWithEmailModel,
  };
};

export default PersonWithEmailFactory;
