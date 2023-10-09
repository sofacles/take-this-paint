import crypto from "crypto";
import config from "../config/config";
import { configType } from "../config/types";

const dev: configType = config.dev;

const ENCRYPTION_KEY = dev.encryptionKey;
const IV_LENGTH = 16; // For AES, this is always 16

const encrypt = (text) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  //console.log(`IV: ${iv}`);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = (text) => {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

export { decrypt, encrypt };
