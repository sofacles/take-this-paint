import jwt from "jsonwebtoken";
import { UserModel } from "./data/models";

var process = require("process");

const verifyToken = async (req, res, next) => {
  const accessToken = req.session?.accessToken;
  if (accessToken) {
    jwt.verify(
      accessToken,
      process.env.SECRET,
      async function (tokenVerifyError, decode) {
        if (tokenVerifyError) {
          req.user = undefined;
          if (tokenVerifyError.name === "TokenExpiredError") {
            res.status(401).send({
              message: "token expired",
            });
            res.end();
            return;
          }
        } else if (decode.email) {
          const userModel = await UserModel.find({
            email: decode.email,
          });
          const theUser = {
            email: userModel[0].email,
          };

          if (!theUser) {
            res.status(500).send({
              message: "fail",
            });
          } else {
            req.user = theUser;
            next();
          }
        }
      }
    );
  } else {
    req.user = undefined;
    res.status(401).json({ result: "unauthorized" });
  }
};
export default verifyToken;
