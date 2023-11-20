import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import { getS3FileUrl, putS3File } from "../data/s3";
import Logger from "../Logger";
import { encrypt, decrypt } from "../cryptoService";

import { PaintCanModel, PersonWithEmailModel } from "../data/models";

//import { sendGMailToConfirmDonorsAddress } from "../gmailService";

const router = express.Router();

const storage = multer.memoryStorage();

const getPaints = async (_, res, next) => {
  try {
    const paints = await PaintCanModel.find({});
    for (let paint of paints) {
      paint.imageName = getS3FileUrl(paint.imageName);
    }
    res.status(200).json(paints);
    next();
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

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

  //paintObj.rgb = paintObj.rgb ? paintObj.rgb : "";
  paintObj.imageName = req.body.imageName;
  if (req.file && req.body.imageName) {
    //sendGMailToConfirmDonorsAddress(postedPaint.email, personWithEmailObj.secret);
    await putS3File(req.body.imageName, req.file);
  }

  try {
    //Logger.info(JSON.stringify(paintObj));
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

    return res.status(201).json({ msg: "Paint saved!" });
  } catch (error) {
    Logger.info(JSON.stringify(error));
    return res.send({ msg: "Unable to save paint." });
  }
};
router.get("/", getPaints);
router.post("/", upload.single("uploadPhoto"), addPaint);

export default router;
