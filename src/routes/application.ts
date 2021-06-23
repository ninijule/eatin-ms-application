import express from "express";
import { body } from "express-validator";
import applicationController from "../controller/applicationController";

const router = express.Router();

router.post(
  "/",

  body("email").isEmail().normalizeEmail().trim().escape(),

  body("name").trim().escape(),

  applicationController.createApplication
);

export default router;
