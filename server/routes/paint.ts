import { PaintCanModel } from "../data/models";
import { Request, Response } from "express";

const getPaints = async (_, res) => {
  try {
    const paints = await PaintCanModel.find({});

    const paintsWithoutEmails = paints.map((p) => ({
      rgb: p.rgb,
      brand: p.brand,
      name: p.name,
      quantity: p.quantity,
      sheen: p.sheen,
      imageName: p.imageName,
      _id: p._id,
    }));

    res.status(200).json(paintsWithoutEmails);
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

export { getPaints };
