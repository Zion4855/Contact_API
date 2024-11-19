import express from "express";
import { login, register } from "../controllers/User.js";

const router = express.Router();

// User reister
router.post("/register", register);

// User loggin
router.post("/login", login);

export default router;
