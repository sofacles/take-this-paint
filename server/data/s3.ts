import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";

import config from "../../config/config";
import { configType } from "../../config/types";
import Logger from "../Logger";

const _config: configType = config.dev;

const {
  awsBucketName,
  bucketRegion,
  bucketAccessKey,
  bucketSecretAccessKey,
  s3BaseUrl,
} = _config;

const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
});

const getS3FileUrl = (key: string) => {
  return s3BaseUrl + "/" + key;
};

const putS3File = async (imageName, file) => {
  const image = await sharp(file.buffer);
  return image
    .metadata()
    .then(function (metadata) {
      const { width } = metadata;
      const shrinkFactor = Math.round(width / 200);

      return image
        .resize(Math.round(width / shrinkFactor))
        .rotate()
        .webp()
        .toBuffer();
    })
    .then(function (data) {
      const params = {
        Bucket: awsBucketName,
        Key: imageName,
        Body: data,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(params);

      return s3Client.send(command);
    })
    .catch(function (err) {
      Logger.error("error in putS3File");
      Logger.error(err);
    });
};

const deleteFile = (imageKey) => {
  const deleteParams = {
    Bucket: awsBucketName,
    Key: imageKey,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
};

export { deleteFile, getS3FileUrl, putS3File, s3BaseUrl };
