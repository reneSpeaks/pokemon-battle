

import express from "express";
import { validateLogin } from "../controllers/validateLogin.js"; // Import the controller

const router = express.Router();

router.post("/", validateLogin);

export default router;