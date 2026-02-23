import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";

const Container = styled.div`
  max-width: 550px;
  display: flex;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.text_secondary + "50"};
  border-radius: 8px;
  padding: 12px 16px;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.bgLight + "40"};
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 10px ${({ theme }) => theme.primary + "20"};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 15px ${({ theme }) => theme.primary + "30"};
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
  background: transparent;
  font-size: 16px;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + "80"};
  }
`;

const SearchBar = () => {
    const [placeholder, setPlaceholder] = useState("");
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState("");
    const [delta, setDelta] = useState(200);

    const words = [
        "Search with prompt or tag...",
        "A cyberpunk city with neon lights...",
        "A cute cat in a space suit...",
        "Portrait of a futuristic warrior...",
        "A floating island in the clouds...",
    ];

    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker);
        };
    }, [text, delta]);

    const tick = () => {
        let i = loopNum % words.length;
        let fullText = words[i];
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta((prevDelta) => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === "") {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(200);
        }
    };

    return (
        <Container>
            <SearchOutlined />
            <Input placeholder={text + (text.length === words[loopNum % words.length].length && !isDeleting ? "" : "|")} />
        </Container>
    );
};

export default SearchBar;