import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotEnv from "dotenv";

dotEnv.config();
const OAuth2 = google.auth.OAuth2;

const { Logger } = require("./logger");

const clientId = process.env.GMAIL_API_CLIENT_ID;
const clientSecret = process.env.GMAIL_API_CLIENT_SECRET;
const refreshToken = process.env.GMAIL_API_REFRESH_TOKEN;
const user = process.env.GMAIL_API_USER;

const oauth2Client = new OAuth2(
  clientId,
  clientSecret,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

const nodeMailerSmtpConfig = {
  service: "gmail",
  auth: {
    clientId,
    clientSecret,
    refreshToken,
    type: "OAuth2",
    user,
  },
};

function sendGMailToConfirmDonorsAddress(to, slug) {
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    ...nodeMailerSmtpConfig,
    accessToken,
  });

  const mailOptions = {
    from: user,
    to,
    subject: "Thanks for posting your paint",
    generateTextFromHTML: true,
    html: `<div>Please follow this link to verify your email. <a href="${process.env.BASE_URL}confirm_email?mn=${slug}" >verify</a></div>`,
  };

  try {
    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? Logger.error(error) : Logger.info(response);
      smtpTransport.close();
    });
  } catch (err) {
    Logger.error({ topCall: "error caught in gmailService.sendMail!", err });
  }
}

function emailDonorToSignalInterest(donorEmail, brand, name) {
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    ...nodeMailerSmtpConfig,
    accessToken,
  });

  const mailOptions = {
    from: user,
    to: donorEmail,
    subject: "Hey, do you still have that paint?",
    generateTextFromHTML: true,
    html: `<div>Somebody is interested in your ${brand} ${name}</div>`,
  };

  try {
    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? Logger.error(error) : Logger.info(response);
      smtpTransport.close();
    });
  } catch (err) {
    Logger.error({ topCall: "error caught in gmailService.sendMail!", err });
  }
}
export { emailDonorToSignalInterest, sendGMailToConfirmDonorsAddress };
