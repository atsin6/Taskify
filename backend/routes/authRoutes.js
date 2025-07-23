import Router from "express";

import {
  validateSignupData,
  validateSigninData,
} from "../middlewares/dataValidation.js";
import {
  signinController,
  signupController,
} from "../controller/authController.js";

const router = Router();

// Checker Route
router.get("/checkAuthRoutes", (req, res) => res.send(`It is working`));
router.post("/signin", validateSigninData, signinController);
router.post("/signup", validateSignupData, signupController);

export default router;
