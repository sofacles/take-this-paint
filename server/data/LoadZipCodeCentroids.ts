import fs from "fs";
import readline from "readline";
import promptSync from "prompt-sync";

import Connect from "./mongooseConnection";
import { HydrateModels, ZipCodeModel } from "./models";
const inputFileName = "./ZIP_Code_Population_Weighted_Centroids.geojson";

const LoadZipCodeCentroids = async () => {
  const readStream = fs.createReadStream(inputFileName);

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let currentZipCodeString = "";
  let currentZipCodeObj;
  let currentTrimmedDownObj;
  const endOfZipCodeObj = "    },";

  const message = fs.createWriteStream("./ZipCodeSeed1.json");
  //I am parsing a file that's not real JSON.  That's why I can always assume each zipcode object ends with "},".
  for await (const line of rl) {
    if (line !== endOfZipCodeObj) {
      currentZipCodeString += line;
    } else {
      currentZipCodeString += line;

      currentZipCodeString = currentZipCodeString.slice(0, -1);
      console.log();
      console.log();
      console.log("about to parse:");
      // console.log(currentZipCodeString);
      currentZipCodeObj = JSON.parse(currentZipCodeString);
      currentTrimmedDownObj = {
        zip: currentZipCodeObj.properties.STD_ZIP5,
        lat: currentZipCodeObj.properties.LATITUDE,
        long: currentZipCodeObj.properties.LONGITUDE,
      };
      console.log(JSON.stringify(currentTrimmedDownObj));
      message.write(`${JSON.stringify(currentTrimmedDownObj)},\n`);
      const zipcodeModel = new ZipCodeModel(currentTrimmedDownObj);
      await zipcodeModel.save();

      currentZipCodeString = "";
    }
  }

  message.close();
};

const main = async () => {
  if (!fs.existsSync(inputFileName)) {
    console.log(
      `${inputFileName} does not exist.  Stopping now before we delete all the zipcodes in the DB.`
    );
    process.exit(-1);
  }
  const prompt = promptSync();
  console.log("Are you sure you want to delete all zipcodes yes / no");
  const OK = prompt("> ");

  if (OK !== "yes") {
    process.exit(-1);
  }
  Connect().then(async (mg) => {
    await HydrateModels(mg);
    await ZipCodeModel.deleteMany({}).catch((err) => {
      console.log("Error while deleting zipcodes:", JSON.stringify(err));
    });
    await LoadZipCodeCentroids();
    console.log("done");
    process.exit(-1);
  });
};

main();
