import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";

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
    const [post, setPost] = useState({
        name: "",
        prompt: "",
        image: "",
    });

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
                            isLoading={false}
                            isDisabled={post.prompt === ""}
                        />
                        <Button
                            text="Post Image"
                            flex
                            type="secondary"
                            leftIcon={<CreateRounded />}
                            isLoading={false}
                            isDisabled={post.name === "" || post.prompt === "" || post.image === ""}
                        />
                    </div>
                </GenerateImage>
            </Wrapper>
        </Container>
    );
};

export default CreatePost;