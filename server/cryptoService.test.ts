import { decrypt, encrypt } from "./cryptoService";

describe("cryptoService", () => {
  it("should encrypt and decrypt a string", () => {
    const encrypted = encrypt("hello@gmail.com");
    const decrypted = decrypt(encrypted);
    expect(decrypted).toEqual("hello@gmail.com");
  });
});
