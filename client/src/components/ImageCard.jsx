import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DownloadForOfflineRounded } from "@mui/icons-material";
import { saveAs } from "file-saver";
import Avatar from "@mui/material/Avatar";

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black};
    scale: 1.02;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2px;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.white};
  transition: opacity 0.3s ease;
  border-radius: 6px;
  padding: 12px;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.white};
`;

const Author = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: white;
`;

const ImageCard = ({ item }) => {
  const handleDownload = async (e) => {
    e.stopPropagation();
    console.log("download url:", item?.photo);
    const url = item?.photo;
    if (!url) return;

    const filename = (item?.prompt && item.prompt.replace(/[^a-z0-9]/gi, "_").slice(0, 20)) || "download";

    // If it's a data URL, convert via fetch then save
    if (url.startsWith("data:")) {
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        saveAs(blob, `${filename}.jpg`);
        return;
      } catch (err) {
        console.error("Data URL download failed:", err);
      }
    }

    // Try fetching the resource and saving as blob (best for same-origin/CORS-enabled)
    try {
      const res = await fetch(url, { mode: 'cors' });
      if (!res.ok) throw new Error("Network response was not ok");
      const blob = await res.blob();
      saveAs(blob, `${filename}.jpg`);
      return;
    } catch (err) {
      console.warn("Fetch failed, attempting anchor fallback:", err);
    }

    // Anchor fallback: may work for some cross-origin URLs (browser-dependent)
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      console.log('Anchor download attempted');
      return;
    } catch (err) {
      console.error('Anchor download failed:', err);
      console.error('If this is a cross-origin URL blocked by CORS, enable CORS on the image server or proxy the image through your backend.');
    }
  };

  return (
    <Card>
      <LazyLoadImage
        src={item?.photo}
        width="100%"
        style={{ borderRadius: "20px", objectFit: "cover" }}
      />
      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",

        }}>
          <Author>
            <Avatar style={{ width: "32px", height: "32px" }}>{item?.name ? item.name[0] : "A"}</Avatar>
            {item?.name}
          </Author>
          <DownloadForOfflineRounded onClick={handleDownload} style={{ cursor: "pointer" }} />
        </div>
      </HoverOverlay>
    </Card>
  )
};

export default ImageCard;