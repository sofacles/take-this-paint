import express from "express";
import fs from "fs/promises";
import { PaintCanModel } from "../../data/models";
import verifyToken from "../../checkLoginMiddleware";

const router = express.Router();

const getPaints = async (_, res, next) => {
  try {
    const paints = await PaintCanModel.find({});

    res.status(200).json(paints);
    next();
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

const deletePaint = async (req, res) => {
  let doomedPaint = await PaintCanModel.findOne({ _id: req.query.id });
  if (doomedPaint.imageName) {
    const imagePath = `${process.cwd()}/public/uploads/resized/${
      doomedPaint.imageName
    }`;
    try {
      await fs.unlink(imagePath);
    } catch (error) {
      console.log(error);
      return res.send({
        status: 200,
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

router.get("/", verifyToken, getPaints);
router.delete("/", verifyToken, deletePaint);

export default router;
