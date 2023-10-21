import { PaintCanModel, PersonWithEmailModel } from "../data/models";
import express from "express";
import Logger from "../Logger";
import path from "path";
import sharp from "sharp";
import { encrypt, decrypt } from "../cryptoService";

import multer from "multer";

import config from "../../config/config";
import { configType } from "../../config/types";
import { sendGMailToConfirmDonorsAddress } from "../gmailService";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const app = express();
const router = express.Router();

const _config: configType = config.dev;

const getPaints = async (_, res, next) => {
  try {
    const paints = await PaintCanModel.find({});

    res.status(200).json(paints);
    next();
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, _config.uploadsFolder);
  },
  filename: function (req, file, cb) {
    let imageName = req.body.imageName;
    if (file.mimetype === "image/jpeg") {
      imageName += ".jpg";
    } else if (file.mimetype === "image/png") {
      imageName += ".png";
    }
    cb(null, imageName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 16,
  },
  fileFilter: fileFilter,
});

const addPaint = async (req, res) => {
  const postedPaint = req.query;
  let paintObj = Object.assign({}, req.query);
  paintObj.email = encrypt(postedPaint.email);

  //I want to force validation of rgb or imageName to occur on this posted object, so setting them to empty strings.  what?  TODO
  paintObj.rgb = paintObj.rgb ? paintObj.rgb : "";
  paintObj.imageName = "";
  if (req.file && req.body.imageName) {
    let newPath = path.resolve(
      req.file.destination,
      "resized",
      req.file.filename
    );

    Logger.info(`resized photo upload path: ${newPath}`);
    //I should maybe figure out how to offload this work to another service
    try {
      await sharp(req.file.path).resize(200).png().toFile(newPath);
    } catch (error) {
      Logger.error("Exception caught resizing", JSON.stringify(error));
    }

    //delete the large file
    fs.unlinkSync(req.file.path);

    paintObj.imageName = req.file.filename;
  }

  try {
    Logger.info(JSON.stringify(paintObj));
    let paintChip = new PaintCanModel(paintObj);
    await paintChip.save().catch((err) => {
      Logger.info(JSON.stringify(err));
    });

    const personWithEmailObj = {
      email: paintObj.email,
      secret: uuidv4(),
    };
    let personWithEmail = new PersonWithEmailModel(personWithEmailObj);
    await personWithEmail.save().catch((err) => {
      Logger.info(
        "Error while saving personWithEmailObj:",
        JSON.stringify(err)
      );
      return res.send({ msg: "Unable to save paint." });
    });

    //sendGMailToConfirmDonorsAddress(postedPaint.email, personWithEmailObj.secret);
    return res.send({ msg: "Paint saved!" });
  } catch (error) {
    Logger.info(JSON.stringify(error));
    return res.send({ msg: "Unable to save paint." });
  }
};
router.get("/", getPaints);
router.post("/", upload.single("uploadPhoto"), addPaint);

export default router;
