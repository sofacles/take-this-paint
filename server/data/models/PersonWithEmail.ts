const PersonWithEmailFactory = (connectedMongoose) => {
  const PersonWithEmailSchema = new connectedMongoose.Schema({
    email: { type: String },
    secret: { type: String }, // AKA slug.  When a user replies to the automatic PostPaint email, the URL will need to have the secret in it.
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
