import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

console.log("OPENAI_API_KEY loaded:", process.env.OPENAI_API_KEY ? "✓ Present" : "✗ Missing");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImageFromPrompt = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY is not configured in .env");
      return res.status(500).json({
        success: false,
        message: "API key not configured. Please set OPENAI_API_KEY in .env file",
      });
    }

    console.log("Generating image for prompt:", prompt);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    if (!response || !response.data || response.data.length === 0) {
      throw new Error("No image generated from OpenAI");
    }

    const imageUrl = response.data[0].url;

    // Fetch the image and convert to base64
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const dataURI = `data:image/png;base64,${base64Image}`;

    return res.status(200).json({
      success: true,
      photo: dataURI,
    });
  } catch (error) {
    console.error("Error generating image details:", error);

    let status = 500;
    let message = "Error generating image";

    // Handle OpenAI specific errors
    if (error.status) {
      status = error.status;
      message = error.message || message;
    } else if (error.response) {
      status = error.response.status || 500;
      message = error.response.data?.error?.message || error.message || message;
    }

    // Specific handling for common issues like billing
    if (message.toLowerCase().includes("billing") || message.toLowerCase().includes("quota")) {
      message = "Your OpenAI API billing limit has been reached. Please check your account or use another API key.";
    }

    return res.status(status).json({
      success: false,
      message: message,
      details: process.env.NODE_ENV === "development" ? error?.toString() : undefined,
    });
  }
};
