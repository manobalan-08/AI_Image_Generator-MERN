import React from 'react'
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const Container = styled.div`
   flex:1;
   padding:16px;
   border:2px dashed ${({ theme }) => theme.yellow};
   color:${({ theme }) => theme.arrow + 80};
   border-radius: 20px;
`;

const Image = styled.img`
     width:100%;
     height:100%;
     object-fit:cover;
     border-radius:24px;
     background:${({ theme }) => theme.black};
`;




const GeneratedImageCard = ({ image, loading }) => {
  return (
    <Container>
      {image ? (
        <Image src={image} alt="generated" />
      ) : loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            color: "white",
            padding: "24px",
          }}
        >
          <CircularProgress
            style={{ width: "24px", height: "24px", color: "inherit" }}
          />
          <div style={{ fontSize: "14px" }}>Generating your image...</div>
        </div>
      ) : (
        <div style={{ color: "white", textAlign: "center", padding: 24 }}>
          Write a Prompt to Generate the Image
        </div>
      )}
    </Container>
  );
};

export default GeneratedImageCard