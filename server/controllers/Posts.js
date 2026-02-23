import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// Get all Posts
export const getAllPosts = async (req, res, next) => {
    try {
        const Posts = await Post.find({});
        return res.status(200).json({ success: true, data: Posts });
    } catch (error) {
        next(
            createError(
                error.status,
                error?.response?.data?.error?.message || error?.message
            )
        );
    }
};

// Create a new Post
export const createPost = async (req, res, next) => {
    try {
        const { name, prompt, photo } = req.body;

        const newPost = new Post({
            name,
            prompt,
            photo,
        });

        await newPost.save();
        return res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        next(
            createError(
                error.status || 500,
                error?.message || "Error creating post"
            )
        );
    }
};

// Search Posts by prompt
export const searchPosts = async (req, res, next) => {
    try {
        const { searchTerm } = req.query;

        if (!searchTerm) {
            return res.status(400).json({ 
                success: false, 
                message: "Search term is required" 
            });
        }

        const Posts = await Post.find({
            $or: [
                { prompt: { $regex: searchTerm, $options: "i" } },
                { name: { $regex: searchTerm, $options: "i" } },
            ],
        });

        return res.status(200).json({ success: true, data: Posts });
    } catch (error) {
        next(
            createError(
                error.status,
                error?.message || "Error searching posts"
            )
        );
    }
};
