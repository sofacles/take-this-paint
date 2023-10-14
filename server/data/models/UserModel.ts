function UserModelFactory(connectedMongoose) {
  const UserSchema = new connectedMongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  const UserModel = connectedMongoose.model("User", UserSchema, "users");

  return { UserSchema, UserModel };
}

export default UserModelFactory;
