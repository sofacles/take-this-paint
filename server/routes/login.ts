import express from "express";
import dotEnv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Logger from "../Logger";
import { UserModel } from "../data/models";
import {
  ACCESS_TOKEN_LIFESPAN,
  AUTH_COOKIE_LIFESPAN,
  REFRESH_TOKEN_LIFESPAN,
} from "../constants";

const router = express.Router();
dotEnv.config();

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userModel = await UserModel.findOne({
      email: email,
    });
    if (!userModel) {
      res.status(400).json({
        status: "failure",
        message: "User not Logged In!",
      });
      res.end();
      return;
    }

    const passwordMatches = await bcrypt.compare(password, userModel.password);

    if (passwordMatches) {
      const tokenPayload = {
        email: userModel.email,
      };
      const accessToken = jwt.sign(
        tokenPayload,
        process.env.SITE_OAUTH_LOGIN_SECRET,
        {
          expiresIn: ACCESS_TOKEN_LIFESPAN,
        }
      );

      const loginResponse = {
        status: "success",
        message: "User Logged In!",
      };

      const refreshToken = jwt.sign(
        tokenPayload,
        process.env.SITE_OAUTH_LOGIN_SECRET,
        {
          expiresIn: REFRESH_TOKEN_LIFESPAN,
        }
      );

      if (req.session) {
        req.session.accessToken = accessToken;
      }

      res.cookie("refresh-jwt", refreshToken, {
        httpOnly: true,
        maxAge: AUTH_COOKIE_LIFESPAN,
      });

      res.cookie("email", userModel.email, {
        httpOnly: true,
        maxAge: AUTH_COOKIE_LIFESPAN,
      });

      res.status(200).json(loginResponse);
    } else {
      res.status(401).json({ message: "login failed" });
    }
  } catch (err) {
    Logger.error(err);
    res.status(err.status).json({
      status: "fail",
      message: err.message,
    });
  }
};

router.post("/", Login);

export default router;
