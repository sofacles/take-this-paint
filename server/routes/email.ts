import {
  MessageModel,
  PaintCanModel,
  PersonWithEmailModel,
} from "paint-models";
import Logger from "../Logger";
import { SendEmailToDonor } from "../SendSESMail";

//The interested party's email, that is.
const confirmEmail = async (req, res) => {
  const qs = req.query;
  const token = qs.token;
  const email = qs.email;
  let interestedPartyWithEmailModel;
  try {
    interestedPartyWithEmailModel = await PersonWithEmailModel.findOne({
      email,
      secret: token,
    });

    interestedPartyWithEmailModel.emailConfirmed = true;
    await interestedPartyWithEmailModel.save();
    Logger.info(`We found a user for ${email} and set emailConfirmed to true`);
  } catch (err) {
    Logger.info(`Unable to find a user for ${email} and token ${token}`);
    Logger.error(err);
    return res
      .status(400)
      .send(
        "We encountered an trying to find a user with that email. Please email admin@paintdonor.us and I'll look into it."
      );
  }

  const messagesForThisUser: (typeof MessageModel)[] = await MessageModel.find({
    interestedPartyEmail: interestedPartyWithEmailModel._id,
  });
  if (messagesForThisUser.length === 0) {
    Logger.error(
      `While confirming recipients email, we found no messages posted by ${interestedPartyWithEmailModel._id}`
    );
  }
  let donorPWE;
  for (let i = 0; i < messagesForThisUser.length; i++) {
    const message = messagesForThisUser[i];
    if (!message.sent) {
      try {
        donorPWE = await PersonWithEmailModel.findOne({
          _id: message.donorEmail,
        });
      } catch (err) {
        Logger.error(
          `Blew up trying to find PersonWithEmail corresponding to ${message.donorEmail}`
        );
        Logger.error(err);
        return res
          .status(400)
          .send(
            "We encountered an trying to find a user with that email. Please email admin@paintdonorus"
          );
      }

      try {
        Logger.info(
          `Sending email to ${donorPWE.email} with text: ${message.text}`
        );
        SendEmailToDonor(donorPWE.email, message.text);
        message.sent = true;
      } catch (err) {
        Logger.error(`Unable to send email to donor: ${donorPWE.email}`);
        Logger.error(err);
      }
    }
  }

  res.status(201).send("Email confirmed, thanks");
};

//They've posted a paint and now they're confirming their email address.
const confirmDonorEmail = async (req, res) => {
  const qs = req.query;
  const token = qs.token;
  const email = qs.email;
  const paintId = qs.paintId;
  try {
    const donorWithEmailModel = await PersonWithEmailModel.findOne({
      email,
      secret: token,
    });
    if (!donorWithEmailModel) {
      Logger.error(
        `Unable to find donorWithEmailModel for ${email} and token ${token}`
      );
      return res.status(400).send("Can't find a donor with that email address");
    }
    Logger.info(
      `The donorWithEmailModel we found was ${JSON.stringify(
        donorWithEmailModel
      )}`
    );
    donorWithEmailModel.emailConfirmed = true;
    await donorWithEmailModel.save();

    const thePaint = await PaintCanModel.findById(paintId);
    thePaint.emailConfirmed = true;
    thePaint.save();

    Logger.info(`Confirmed email for ${email} and paint:${paintId}`);

    res.status(201).send("Email confirmed, thanks");
  } catch (err) {
    Logger.info(
      `Unable to confirm email: ${email} for paint:${paintId} and token: ${token}`
    );
    return res
      .status(400)
      .send(
        "We encountered an error while trying to update your account. Please email admin@paintdonor.us and I'll look into it."
      );
  }
};

export { confirmDonorEmail, confirmEmail };
