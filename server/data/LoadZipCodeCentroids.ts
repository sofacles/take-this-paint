import Connect from "./mongooseConnection";
import { HydrateModels, ZipCodeModel } from "./models";
import fs from "fs";
import readline from "readline";

const LoadZipCodeCentroids = async () => {
  const readStream = fs.createReadStream("./ZIP_Code_Centroids.json");

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
  Connect().then(async (mg) => {
    await HydrateModels(mg);

    await LoadZipCodeCentroids();
    console.log("done");
    process.exit(-1);
  });
};

main();
