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

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type Inputs = {
  name: string;
  brand: string;
  quantity: string;
  email: string;
  confirmEmail: string;
  zipCode: string;
  rgb: string;
};
