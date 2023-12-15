import express from "express";
import fs from "fs/promises";
import { PaintCanModel, PersonWithEmailModel } from "../../data/models";
import { deleteFile, getS3FileUrl } from "../../data/s3";
import verifyToken from "../../checkLoginMiddleware";
import Logger from "../../Logger";

const router = express.Router();

const getPaints = async (_, res, next) => {
  try {
    const paints = await PaintCanModel.find({});
    const adjustedPaints = Array<typeof PaintCanModel>();
    for (let paint of paints) {
      if (paint.imageName) {
        //need to prepend the url to the image name
        paint.imageName = getS3FileUrl(paint.imageName);
      }
    }
    res.status(200).json(paints);
    next();
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

const deletePaint = async (req, res) => {
  Logger.info(`deletePaint: ${req.query.id}`);
  let doomedPaint = await PaintCanModel.findOne({ _id: req.query.id });
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
          result: "delete image failed",
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
          result: "delete image failed",
        },
      });
    }
  }

  let deleteResult = await PaintCanModel.deleteOne({ _id: req.query.id });
  res.send({
    status: 200,
    data: {
      result: deleteResult.deletedCount === 1 ? "success" : "deleteFailed",
    },
  });
};

const updatePaint = async (req, res) => {
  const { _id, emailConfirmed } = req.body;
  const paint = await PaintCanModel.findById(_id);
  if (paint) {
    paint.emailConfirmed = emailConfirmed;
    await paint.save();
    return res.status(204).send();
  }
  res.status(400).json({ err: "Paint not found" });
};

router.get("/", verifyToken, getPaints);
router.delete("/", verifyToken, deletePaint);
router.put("/", verifyToken, updatePaint);

export default router;
