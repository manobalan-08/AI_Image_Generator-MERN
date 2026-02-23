import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import GeneratedImageCard from "../components/GeneratedImageCard";
import { generateAIImage, createPost as createPostAPI } from "../api/index.js";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1200px;
  gap: 8%;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const GenerateImage = styled.div`
  flex: 1;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "50"};
  color: ${({ theme }) => theme.text_secondary};
  border-radius: 20px;
`;

const CreatePost = () => {
    const [generateImageLoading, setGenerateImageLoading] = useState(false);
    const [createPostLoading, setCreatePostLoading] = useState(false);
    const [post, setPost] = useState({
        name: "",
        prompt: "",
        image: "",
    });

    const generateImage = async () => {
        if (!post.prompt.trim()) {
            alert("Please enter a prompt");
            return;
        }

        setGenerateImageLoading(true);
        try {
            const response = await generateAIImage(post.prompt);
            if (response.data.success) {
                setPost({ ...post, image: response.data.photo });
            }
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Error generating image. Please try again.");
        } finally {
            setGenerateImageLoading(false);
        }
    };

    const createPost = async () => {
        if (!post.name.trim() || !post.prompt.trim() || !post.image) {
            alert("Please fill in all fields and generate an image first");
            return;
        }

        setCreatePostLoading(true);
        try {
            const response = await createPostAPI({
                name: post.name,
                prompt: post.prompt,
                photo: post.image,
            });

            if (response.data.success) {
                alert("Post created successfully!");
                setPost({
                    name: "",
                    prompt: "",
                    image: "",
                });
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Error creating post. Please try again.");
        } finally {
            setCreatePostLoading(false);
        }
    };

    return (
        <Container>
            <Wrapper>
                <GenerateImage>
                    <div style={{ fontSize: "28px", fontWeight: "500", color: "white" }}>
                        Generate Image with Prompt
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "400" }}>
                        Write your prompt below to generate an image
                    </div>
                    <TextInput
                        label="Author"
                        placeholder="Enter your name"
                        name="name"
                        value={post.name}
                        onChange={(e) => setPost({ ...post, name: e.target.value })}
                    />
                    <TextInput
                        label="Prompt"
                        placeholder="Write a detailed prompt to generate an image"
                        name="prompt"
                        textArea
                        rows="8"
                        value={post.prompt}
                        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                    />
                    <div style={{ display: "flex", gap: "12px" }}>
                        <Button
                            text="Generate Image"
                            flex
                            leftIcon={<AutoAwesome />}
                            isLoading={generateImageLoading}
                            isDisabled={post.prompt === ""}
                            onClick={() => generateImage()}
                        />
                        <Button
                            text="Post Image"
                            flex
                            type="secondary"
                            leftIcon={<CreateRounded />}
                            isLoading={createPostLoading}
                            isDisabled={
                                post.name === "" || post.prompt === "" || post.image === ""
                            }
                            onClick={() => createPost()}
                        />
                    </div>
                </GenerateImage>
                <GeneratedImageCard image={post.image} loading={generateImageLoading} />
            </Wrapper>
        </Container>
    );
};

export default CreatePost;