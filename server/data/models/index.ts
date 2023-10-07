import PaintCanFactory from "./PaintCan";

let PaintCanModel;

const HydrateModels = async (connectedMongoose) => {
  const obj = PaintCanFactory(connectedMongoose);
  PaintCanModel = obj.PaintCan;
  const foo = await PaintCanModel.find({});
};

export { HydrateModels, PaintCanModel };
