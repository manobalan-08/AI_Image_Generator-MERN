import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        prompt: {
            type: String,
            required: [true, "Please provide a prompt"],
        },
        photo: {
            type: String,
            required: [true, "Please provide a photo"],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
