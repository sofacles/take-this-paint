import mongoose from "mongoose";

const MessageFactory = (connectedMongoose) => {
  const MessageSchema = new connectedMongoose.Schema({
    text: { type: String },
    donorEmail: {
      type: mongoose.Types.ObjectId,
      ref: "PersonWithEmail",
      required: true,
    },
    interestedPartyEmail: {
      type: mongoose.Types.ObjectId,
      ref: "PersonWithEmail",
      required: true,
    },
    paintId: {
      type: mongoose.Types.ObjectId,
      ref: "PaintCan",
      required: true,
    },
    postedOn: { type: Date, required: false, default: Date.now },
  });

  const MessageModel = connectedMongoose.model(
    "MessageSchema",
    MessageSchema,
    "message"
  );

  return {
    MessageSchema,
    MessageModel,
  };
};

export default MessageFactory;
