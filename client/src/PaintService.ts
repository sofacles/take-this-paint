import querystring from "querystring";
import { v4 as uuidv4 } from "uuid";
import { Inputs } from "./types";

const GetPaints = async () => {
  const response = await fetch("/api/paints");
  return await response.json();
};

const PostPaint = async (data: Inputs) => {
  const {
    brand,
    email,
    confirmEmail,
    name,
    quantity,
    oneOf: { rgb, uploadPhoto },
    sheen,
    zipCode,
  } = data;
  let formData = new FormData();
  formData.append("imageName", uuidv4());
  if (uploadPhoto?.data) {
    formData.append("uploadPhoto", uploadPhoto.data);
  }

  let qs = querystring.encode({
    brand,
    email,
    confirmEmail,
    name,
    quantity,
    rgb,
    sheen,
    zipCode,
  });
  const response = await fetch(`/api/paints/?${qs}`, {
    method: "POST",
    body: formData,
  });

  return {
    status: response.status,
  };
};

export { GetPaints, PostPaint };
