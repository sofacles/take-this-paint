export type PaintType = {
  _id: string;
  emailConfirmed: boolean;
  emailRef: string;
  rgb: string;
  name: string;
  imageName: string;
  brand: string;
  quantity: string;
  sheen: string;
  zipCode: string;
};

export type PaintTileProps = {
  paintUnit: PaintType;
};

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type UploadPhotoType = { preview: string; data: File | null };

export type Inputs = {
  brand: string;
  confirmEmail: string;
  name: string;
  sheen: string;
  email: string;
  quantity: string;
  oneOf: {
    rgb: string;
    uploadPhoto: UploadPhotoType;
  };
  zipCode: string;
};

export type MessageToDonorFields = {
  confirmEmail: string;
  email: string;
  text: string;
};

export type ALLOWED_IDS_FOR_SELECT = "brand" | "quantity" | "sheen";

export type ZipCodeFieldsType = { milesFrom: number; zipCode: string };
// export type OnZipCodeChangeReturnType = {
//   milesFrom: number;
//   zipCode: string;
//   zipCodeError: string;
// };
