import nodemailer from "nodemailer";
import sesTransport from "nodemailer-ses-transport";

import { ADMIN_EMAIL, BASE_URL } from "./constants";
import Logger from "./Logger";

const SendEmailToConfirmEmailAddress = (to, slug) => {
  const encodedEmail = to.replace("+", "%2B");
  const html = `<html><body>Thanks for using the paint donor site! Would you please <a href="${BASE_URL}/confirm-email?email=${encodedEmail}&token=${slug}">confirm your email?</a></body><html>`;
  var mailOptions = {
    from: ADMIN_EMAIL,
    to: to,
    subject: "Test email 1",
    text: "This is some text",
    html: html,
  };
  function callback(error, info) {
    if (error) {
      Logger.error(
        `SendEmailToConfirmEmailAddress encountered error trying to send email to ${encodedEmail} with slug ${slug}. Error: ${error}`
      );
    } else {
      Logger.info(
        `SendEmailToConfirmEmailAddress sent email to ${encodedEmail} with slug ${slug}`
      );
    }
  }

  // Send e-mail using AWS SES
  mailOptions.subject = "Please confirm your email address for paintdonor.us";
  var sesTransporter = nodemailer.createTransport(
    sesTransport({
      accessKeyId: process.env.AWS_SES_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
      region: process.env.AWS_SES_REGION,
    })
  );
  sesTransporter.sendMail(mailOptions, callback);
};

const SendEmailToConfirmEmailAddressAndPaint = (to, slug, paintId) => {
  const encodedEmail = encodeURIComponent(to);
  const html = `<html><body><h1>Thanks for posting your paint.</h1> 
    <div>Please <a href="${BASE_URL}/confirm-donor-email?email=${encodedEmail}&token=${slug}&paintId=${paintId}">confirm your email</a> and we'll start showing your paint to people within 20 miles of your zipcode.<div>
    <div>When you've successfully gotten rid of your paint, please click this link to <a href="${BASE_URL}/delete-paint?paintId=${paintId}&token=${slug}">delete your paint.</a></div>
    </body><html>`;
  var mailOptions = {
    from: ADMIN_EMAIL,
    to: to,
    subject: "Test email 1",
    text: "This is some text",
    html: html,
  };
  function callback(error, info) {
    if (error) {
      Logger.error(
        `SendEmailToConfirmEmailAddressAndPaint encountered error trying to send email to ${to} with slug ${slug}. Error: ${error}`
      );
    } else {
      Logger.info(
        `SendEmailToConfirmEmailAddressAndPaint sent email to ${to} with slug ${slug}`
      );
    }
  }

  // Send e-mail using AWS SES
  mailOptions.subject = "Please confirm your email address for paintdonor.us";
  var sesTransporter = nodemailer.createTransport(
    sesTransport({
      accessKeyId: process.env.AWS_SES_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
      region: process.env.AWS_SES_REGION,
    })
  );
  sesTransporter.sendMail(mailOptions, callback);
};

const SendEmailToDonor = (to, body) => {
  Logger.info(`SendEmailToDonor called with ${to} and ${body}`);
  const html = `<html><body>${body}</a></body><html>`;
  var mailOptions = {
    from: ADMIN_EMAIL,
    to: to,
    subject: "Test email 1",
    text: "This is some text",
    html: html,
  };
  Logger.info(`mailOptions: ${JSON.stringify(mailOptions)}`);
  function callback(error, info) {
    if (error) {
      Logger.error(
        `SendEmailToDonor encountered error trying to send email to ${to} containing ${body}. Error: ${error}`
      );
    } else {
      Logger.info(`SendEmailToDonor sent email to ${to} containing ${body}`);
    }
  }

  mailOptions.subject = "Someone is interested in your paint";
  Logger.info(`accessKeyId is ${process.env.AWS_SES_ACCESS_KEY}`);
  Logger.info(`secretAccessKey is ${process.env.AWS_SES_SECRET_ACCESS_KEY}`);
  Logger.info(`region is ${process.env.AWS_SES_REGION}`);
  var sesTransporter = nodemailer.createTransport(
    sesTransport({
      accessKeyId: process.env.AWS_SES_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
      region: process.env.AWS_SES_REGION,
    })
  );
  sesTransporter.sendMail(mailOptions, callback);
};

export {
  SendEmailToDonor,
  SendEmailToConfirmEmailAddress,
  SendEmailToConfirmEmailAddressAndPaint,
};
