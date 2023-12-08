import bcrypt from "bcryptjs";
// when you run node CreateAdminUser.js you'll need .env to be in the same directory
import dotEnv from "dotenv";
import { UserModel, HydrateModels } from "./models";
import Connect from "./mongooseConnection";

dotEnv.config();
const CreateAdminUser = async () => {
  await Connect().then(async (mg) => {
    await HydrateModels(mg);
    const existingUsers = await UserModel.findOne({
      email: process.env.SITE_ADMIN_EMAIL,
    });
    if (existingUsers) {
      await existingUsers.deleteOne();
    }

    const newUser = {
      email: process.env.SITE_ADMIN_EMAIL,
      password: await bcrypt.hash(process.env.SITE_ADMIN_PASSWORD, 12),
    };
    const newUserEntity = new UserModel(newUser);
    await newUserEntity.save();
    console.log("success!");
    process.exit(0);
  });
};

CreateAdminUser();

export default CreateAdminUser;
