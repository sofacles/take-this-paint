import bcrypt from "bcryptjs";
import dotEnv from "dotenv";
import { UserModel, HydrateModels } from "./models";
import Connect from "./mongooseConnection";

dotEnv.config();
const CreateAdminUser = async () => {
  const connectedMongoose = await Connect();
  await HydrateModels(connectedMongoose);

  const newUser = {
    email: process.env.SITE_ADMIN_EMAIL,
    password: await bcrypt.hash(process.env.SITE_ADMIN_EMAIL, 12),
  };

  const newUserEntity = new UserModel(newUser);
  await newUserEntity.save();
};

CreateAdminUser();

export default CreateAdminUser;
