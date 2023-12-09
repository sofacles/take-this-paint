import express from "express";
import { v4 as uuidv4 } from "uuid";

import {
  MessageModel,
  PaintCanModel,
  PersonWithEmailModel,
} from "../data/models";
import Logger from "../Logger";
import { SendEmailToConfirmEmailAddress } from "../SendSESMail";

const router = express.Router();

const postMessage = async (req, res) => {
  const { email, confirmEmail, text, paintId } = req.body;
  if (email !== confirmEmail) {
    return res.status(400).json({ msg: "Emails do not match" });
  }
  //Don't send this mail till the interested party has confirmed their email address.
  const interestedRecipient = new PersonWithEmailModel({
    email: email,
    secret: uuidv4(),
  });

  try {
    await interestedRecipient.save();
    SendEmailToConfirmEmailAddress(email, interestedRecipient.secret);
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ err: error });
  }

  const thePaintInQuestion = await PaintCanModel.findById(paintId);

  try {
    const newMessage = new MessageModel({
      donorEmail: thePaintInQuestion.emailRef,
      interestedPartyEmail: interestedRecipient._id,
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
