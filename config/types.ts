const config = {
  admin: {
    email: "user1@aol.com",
    password: "password",
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
