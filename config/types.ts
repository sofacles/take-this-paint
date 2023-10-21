const config = {
  admin: {
    email: "user1@aol.com",
    password: "password",
  },
  baseUrl: "http://localhost:3000/",
  gmailAPI: {
    clientId: "123456789-rtwertyuyuioertyuioertyui.apps.braniff.com",
    clientSecret: "12345678901234567890mmmmmmmmmm",
    refreshToken: "A long string of characters",
    user: "mail@foo.com",
  },
  authSource: "admin",
  user: "user",
  pass: "pass",
  dbURI: "mongodb://127.0.0.1:27017/foo",
  logFolder: "logs",
  encryptionKey: "abc123",
  oauthLoginSecret: "secret",
  uploadsFolder: "public/uploads",
};

export type configType = typeof config;
