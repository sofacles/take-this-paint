import dotenv from "dotenv";
import { defineConfig } from "cypress";
dotenv.config();
console.log("TEST");
console.log(`process.env is ${JSON.stringify(process.env)})`);
process.exit(0);

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    loginEmail: process.env.SITE_ADMIN_EMAIL,
    loginPassword: process.env.SITE_ADMIN_PASSWORD,
  },
});
