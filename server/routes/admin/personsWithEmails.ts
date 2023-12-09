import express from "express";
import { PersonWithEmailModel } from "../../data/models";
import verifyToken from "../../checkLoginMiddleware";

const router = express.Router();

const getPersonsWithEmails = async (_, res, next) => {
  try {
    const personsWithEmails = await PersonWithEmailModel.find({});

    res.status(200).json(personsWithEmails);
    next();
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

const updatePersonsWithEmails = async (req, res, next) => {
  try {
    const { _id, emailConfirmed } = req.body;
    const pwe = await PersonWithEmailModel.findById(_id);
    if (pwe) {
      pwe.emailConfirmed = emailConfirmed;
      await pwe.save();
      return res.status(204).json(pwe);
    }
    res.status(400).json({ msg: `Unable to find PWE for ${_id}` });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

const deletePersonsWithEmails = async (req, res, next) => {
  const { _id } = req.body;
  const pwe = await PersonWithEmailModel.findById(_id);
  if (pwe) {
    try {
      await pwe.deleteOne();
      return res.status(204).json({ msg: `Deleted PWE for ${_id}` });
    } catch (error) {
      res.status(500).json({ err: error });
    }
  }
};

router.get("/", verifyToken, getPersonsWithEmails);
router.post("/", verifyToken, updatePersonsWithEmails);
router.delete("/", verifyToken, deletePersonsWithEmails);

export default router;
