import bcrypt from "bcryptjs";
import config from "../../config/config";
import { configType } from "../../config/types";
import { UserModel, HydrateModels } from "./models";
import Connect from "./mongooseConnection";

const _config: configType = config.dev;
const CreateAdminUser = async () => {
  const connectedMongoose = await Connect();
  await HydrateModels(connectedMongoose);

  const newUser = {
    email: _config.admin.email,
    password: await bcrypt.hash(_config.admin.password, 12),
  };

  const newUserEntity = new UserModel(newUser);
  await newUserEntity.save();
  const result = "hmm.  can I ";
};

CreateAdminUser();

export default CreateAdminUser;
