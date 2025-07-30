import express from "express"
import { signIn, signUp } from "./authenticationController"
import { requestValidate } from "../middleware/requestValidate"
import { AuthenticationDTO } from "../DTO/authenticationDto"

const router = express.Router();

// public routes
router.post("/signin", requestValidate(AuthenticationDTO), signIn);
router.post("/signup", requestValidate(AuthenticationDTO), signUp);

export default router;
