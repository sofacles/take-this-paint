import PaintCanFactory from "./PaintCan";
import PersonWithEmailFactory from "./PersonWithEmail";

let PaintCanModel;
let PersonWithEmailModel;

const HydrateModels = async (connectedMongoose) => {
  const _paint = PaintCanFactory(connectedMongoose);
  PaintCanModel = _paint.PaintCan;
  const foo = await PaintCanModel.find({});
  const _personWithEmail = PersonWithEmailFactory(connectedMongoose);
  PersonWithEmailModel = _personWithEmail.PersonWithEmailModel;
};

export { HydrateModels, PaintCanModel, PersonWithEmailModel };
