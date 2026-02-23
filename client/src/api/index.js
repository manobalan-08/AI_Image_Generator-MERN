import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});

export const generateAIImage = (prompt) => API.post("/generate", { prompt });
export const getAllPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const searchPosts = (searchTerm) =>
    API.get(`/posts/search?searchTerm=${searchTerm}`);
