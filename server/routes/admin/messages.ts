import express from "express";
import { MessageModel } from "../../data/models";
import verifyToken from "../../checkLoginMiddleware";

const router = express.Router();

const getMessages = async (_, res, next) => {
  try {
    const messages = await MessageModel.find({});

    res.status(200).json(messages);
    next();
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

const deleteMessages = async (req, res, next) => {
  const { _id } = req.body;
  const messageToDelete = MessageModel.findById(_id);
  if (messageToDelete) {
    try {
      await messageToDelete.deleteOne();
      return res.status(204).json({ msg: `Deleted message for ${_id}` });
    } catch (error) {
      res.status(500).json({ err: error });
    }
  }
};

router.get("/", verifyToken, getMessages);
router.delete("/", verifyToken, deleteMessages);

export default router;
