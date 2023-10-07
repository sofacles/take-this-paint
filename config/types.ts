const config = {
  authSource: "admin",
  user: "user",
  pass: "pass",
  dbURI: "mongodb://127.0.0.1:27017/foo",
};

export type configType = typeof config;
