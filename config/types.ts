const config = {
  admin: {
    email: "user1@aol.com",
    password: "password",
  },
  awsBucketName: "paints",
  bucketRegion: "us-east-1",
  bucketAccessKey: "12345678901234567890",
  bucketSecretAccessKey: "1234567890123456789012345678901234567890",
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
  s3BaseUrl: "https://bucket.region.com",
};

export type configType = typeof config;
