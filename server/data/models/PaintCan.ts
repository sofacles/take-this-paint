import mongoose from "mongoose";
const PaintCanFactory = (connectedMongoose) => {
  const PaintCanSchema = new connectedMongoose.Schema({
    rgb: {
      type: String,
      required: false,
      validate: {
        validator: function (r) {
          let rgbResult =
            (this.imageName !== undefined && this.imageName.length > 3) ||
            (r !== undefined && r.length >= 3);
          return rgbResult;
        },
      },
    },
    imageName: {
      type: String,
      required: false,
      validate: {
        validator: function (r) {
          let imgNameResult =
            (this.rgb !== undefined && this.rgb.length >= 3) ||
            (r !== undefined && r.length > 3);
          return imgNameResult;
        },
      },
    },
    brand: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    postedOn: { type: Date, required: true },
    emailRef: {
      type: mongoose.Types.ObjectId,
      ref: "PersonWithEmail",
      required: false,
    },
    emailConfirmed: { type: Boolean, required: false },
    sheen: { type: String, required: false },
    zipCode: {
      type: String,
      required: false,
      validate: {
        validator: function (r) {
          return /^\d{5}$/.test(r);
        },
      },
    },
  });

  const PaintCan = connectedMongoose.model(
    "PaintCan",
    PaintCanSchema,
    "paintCans"
  );

  return { PaintCan, PaintCanSchema };
};

export default PaintCanFactory;
