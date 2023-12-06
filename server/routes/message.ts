import express from "express";
import { encrypt } from "../cryptoService";
import { v4 as uuidv4 } from "uuid";

import {
  MessageModel,
  PaintCanModel,
  PersonWithEmailModel,
} from "../data/models";
import Logger from "../Logger";

const router = express.Router();

const postMessage = async (req, res) => {
  const { email, confirmEmail, text, paintId } = req.body;
  if (email !== confirmEmail) {
    return res.status(400).json({ msg: "Emails do not match" });
  }
  //Hmm.  I can't really send send this mail till the interested party has confirmed their email address.
  const personWithEmailObj = new PersonWithEmailModel({
    email: encrypt(email),
    secret: uuidv4(),
  });

  try {
    await personWithEmailObj.save();
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ err: error });
  }

  const donorEmail = await PaintCanModel.findById(paintId);

  try {
    const newMessage = new MessageModel({
      donorEmail: donorEmail._id,
      interestedPartyEmail: personWithEmailObj._id,
      text: text,
      paintId: paintId,
    });
    await newMessage.save();
    res.status(200).json({ msg: "Message received" });
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ err: error });
  }
};

router.post("/", postMessage);

export default router;
