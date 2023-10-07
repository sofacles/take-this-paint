import { PaintCanModel } from "../data/models";
import { Request, Response } from "express";

const getPaints = async (_, res) => {
  try {
    const paints = await PaintCanModel.find({});

    res.status(200).json(paints);
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

export { getPaints };
