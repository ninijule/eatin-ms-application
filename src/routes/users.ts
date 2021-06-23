import express from "express";
import { body } from "express-validator";
import userController from "../controller/userController";

const router = express.Router();

router.post(
  "/",

  body("email").isEmail().normalizeEmail().trim().escape(),

  body("name").trim().escape(),

  userController.addUser
);

export default router;
