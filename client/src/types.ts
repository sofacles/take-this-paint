export type PaintType = {
  _id: string;
  rgb: string;
  name: string;
  imageName: string;
  brand: string;
  quantity: string;
  sheen: string;
};

export type PaintTileProps = {
  paintUnit: PaintType;
};