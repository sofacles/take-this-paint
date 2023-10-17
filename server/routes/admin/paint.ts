import { PaintCanModel } from "../../data/models";
import verifyToken from "../../checkLoginMiddleware";
import express from "express";

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

router.get("/", verifyToken, getPaints);

export default router;
