import express from "express";
import { generateImageFromPrompt } from "../controllers/GenerateAIImage.js";

const router = express.Router();

router.post("/", generateImageFromPrompt);

export default router;
