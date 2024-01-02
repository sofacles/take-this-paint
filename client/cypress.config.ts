import dotenv from "dotenv";
import { defineConfig } from "cypress";
dotenv.config();

const config = defineConfig({
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

export default config;
