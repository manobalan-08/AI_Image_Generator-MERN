import express from "express";
import { getAllPosts, createPost, searchPosts } from "../controllers/Posts.js";


const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.get("/search", searchPosts);

export default router;