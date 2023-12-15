import PaintCanFactory from "./PaintCan";
import PersonWithEmailFactory from "./PersonWithEmail";
import UserModelFactory from "./UserModel";
import MessageFactory from "./Message";
import ZipCodeFactory from "./ZipCode";

let MessageModel;
let PaintCanModel;
let PersonWithEmailModel;
let UserModel;
let ZipCodeModel;

const HydrateModels = async (connectedMongoose) => {
  const _paint = PaintCanFactory(connectedMongoose);
  PaintCanModel = _paint.PaintCan;
  const foo = await PaintCanModel.find({});
  const _personWithEmail = PersonWithEmailFactory(connectedMongoose);
  PersonWithEmailModel = _personWithEmail.PersonWithEmailModel;
  const bar = await PersonWithEmailModel.findOne({});
  const _user = UserModelFactory(connectedMongoose);
  UserModel = _user.UserModel;
  const baz = await UserModel.find({});
  const _message = MessageFactory(connectedMongoose);
  MessageModel = _message.MessageModel;
  const mem = await MessageModel.find({});
  const _zipCode = ZipCodeFactory(connectedMongoose);
  ZipCodeModel = _zipCode.ZipCodeModel;
};

export {
  HydrateModels,
  MessageModel,
  PaintCanModel,
  PersonWithEmailModel,
  UserModel,
  ZipCodeModel,
};
