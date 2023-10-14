import PaintCanFactory from "./PaintCan";
import PersonWithEmailFactory from "./PersonWithEmail";
import UserModelFactory from "./UserModel";

let PaintCanModel;
let PersonWithEmailModel;
let UserModel;

const HydrateModels = async (connectedMongoose) => {
  const _paint = PaintCanFactory(connectedMongoose);
  PaintCanModel = _paint.PaintCan;
  const foo = await PaintCanModel.find({});
  const _personWithEmail = PersonWithEmailFactory(connectedMongoose);
  PersonWithEmailModel = _personWithEmail.PersonWithEmailModel;
  const _user = UserModelFactory(connectedMongoose);
  UserModel = _user.UserModel;
};

export { HydrateModels, PaintCanModel, PersonWithEmailModel, UserModel };
