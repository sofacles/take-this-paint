import promptSync from "prompt-sync";

import { PersonWithEmailModel, PaintCanModel, HydrateModels } from "./models";
import Connect from "./mongooseConnection";

const DeletePersonWithEmailModelsAndAllPaints = async () => {
  const prompt = promptSync();
  console.log(
    "Are you sure you want to delete all paints and PersonsWithEmails yes / no"
  );
  const OK = prompt("> ");

  if (OK !== "yes") {
    process.exit(-1);
  }

  const connectedMongoose = await Connect();
  await HydrateModels(connectedMongoose);

  await PaintCanModel.deleteMany({});
  await PersonWithEmailModel.deleteMany({});
  console.log("done");
  process.exit(-1);
};

DeletePersonWithEmailModelsAndAllPaints();

export default DeletePersonWithEmailModelsAndAllPaints;
