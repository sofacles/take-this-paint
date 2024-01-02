import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import { deleteFile, getS3FileUrl, putS3File } from "../data/s3";
import Logger from "../Logger";

import {
  PaintCanModel,
  PersonWithEmailModel,
  ZipCodeModel,
} from "../data/models";
import GetDistanceBetween from "../data/models/DistanceCalculator";

import { SendEmailToConfirmEmailAddressAndPaint } from "../SendSESMail";

const router = express.Router();

const storage = multer.memoryStorage();

const getPaints = async (req, res, next) => {
  try {
    const { zipCode, milesFrom } = req.query;
    const nearbyPaints = [];
    const radius = isNaN(parseInt(milesFrom)) ? 20 : parseInt(milesFrom);
    const usersZipCode = zipCode || "98122";
    const paints = await PaintCanModel.find({ emailConfirmed: true });
    const userGeo = await ZipCodeModel.findOne({
      zip: usersZipCode,
    });
    if (!userGeo) {
      return res.status(400).json({ msg: "We can't find that zip code" });
    }
    for (let paint of paints) {
      const { lat: usersLat, long: usersLon } = userGeo;
      const paintGeo = await ZipCodeModel.findOne({
        zip: paint.zipCode,
      });
      const { lat: paintLat, long: paintLon } = paintGeo;
      const distance = GetDistanceBetween(
        usersLat,
        usersLon,
        paintLat,
        paintLon
      );
      if (distance <= radius) {
        if (paint.imageName) {
          paint.imageName = getS3FileUrl(paint.imageName);
        }

        nearbyPaints.push(paint);
      }
    }
    res.status(200).json(nearbyPaints);
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
  const { email, confirmEmail } = req.query;
  if (email !== confirmEmail) {
    return res.status(400).json({ msg: "Emails do not match" });
  }

  let paintObj: typeof PaintCanModel = Object.assign({}, req.query);
  delete paintObj.email;
  delete paintObj.confirmEmail;
  const personWithEmailObj = {
    email: email,
    secret: uuidv4(),
  };
  let personWithEmail = new PersonWithEmailModel(personWithEmailObj);
  await personWithEmail.save().catch((err) => {
    Logger.info("Error while saving personWithEmailObj:", JSON.stringify(err));
    Logger.error(err);
    Logger.info("-----------------------------------");
    return res.send({ msg: "Unable to save paint." });
  });

  paintObj.emailRef = personWithEmail._id;
  paintObj.postedOn = new Date();

  if (req.file && req.body.imageName) {
    paintObj.imageName = req.body.imageName;
    //sendGMailToConfirmDonorsAddress(postedPaint.email, personWithEmailObj.secret);
    await putS3File(req.body.imageName, req.file);
  }

  try {
    //Logger.info(JSON.stringify(paintObj));
    let paintChip = new PaintCanModel(paintObj);
    await paintChip.save().catch((err) => {
      Logger.info(
        `Hey we're about to delete personWithEmailModel for ${email}.  Err: ${JSON.stringify(
          err
        )}`
      );
      Logger.error(err);
      Logger.info("-----------------------------------");
      personWithEmail.delete();
    });
    try {
      SendEmailToConfirmEmailAddressAndPaint(
        email,
        personWithEmailObj.secret,
        paintChip._id
      );
    } catch (err) {
      Logger.error(err);
    }

    return res.status(201).json({ msg: "Paint saved!" });
  } catch (error) {
    Logger.info(JSON.stringify(error));
    return res.send({ msg: "Unable to save paint." });
  }
};

const deletePaint = async (req, res) => {
  const { paintId, token } = req.query;
  let doomedPaint = await PaintCanModel.findOne({ _id: paintId });
  let doomedDonor = await PersonWithEmailModel.findOne({
    _id: doomedPaint.emailRef,
  });
  //It's possible that the donor was deleted using the admin tool.
  if (doomedDonor) {
    doomedDonor.deleteOne({ _id: doomedPaint.emailRef }).catch((error: any) => {
      Logger.error(error);
      return res.send({
        status: 400,
        data: {
          result:
            "delete failed, we'll look into it and try to finish the delete later",
        },
      });
    });
  }

  if (doomedPaint.imageName) {
    try {
      await deleteFile(doomedPaint.imageName);
    } catch (error) {
      Logger.error(error);
      return res.send({
        status: 400,
        data: {
          result:
            "delete image failed, we'll look into it and try to finish the delete later",
        },
      });
    }
  }

  let deleteResult = await PaintCanModel.deleteOne({ _id: paintId }).catch(
    (error: any) => {
      Logger.error(error);
    }
  );
  res.send({
    status: 200,
    data: {
      result: deleteResult.deletedCount === 1 ? "success" : "deleteFailed",
    },
  });
};

router.get("/", getPaints);
router.post("/", upload.single("uploadPhoto"), addPaint);
router.delete("/", deletePaint);

export default router;
