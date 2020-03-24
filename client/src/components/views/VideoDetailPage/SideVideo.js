import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const SideVideoBlock = styled.div`
  display: flex;
  padding: 0 2rem;
  margin-bottom: 1rem;

  .img {
    width: 40%;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
  .content {
    width: 50%;
    a{
        color: grey;
    }
  }
`;

// 1개
const SideVideo = () => {
  const [sideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then(response => {
      if (response.data.success) {
        // console.log(response.data.videos);
        setSideVideos(response.data.videos);
      } else {
        alert("failed to get videoList");
      }
    });
  }, []);

  const renderSideVideos = sideVideos.map((sideVideo, i) => {
    const minutes = Math.floor(sideVideo.duration / 60);
    const seconds = Math.floor(sideVideo.duration - minutes * 60);
    return (
      <SideVideoBlock key={i}>
        {/* 좌측 img 부분 */}
        <div className="img">
          <Link to={`/video/${sideVideo._id}`}>
            <img
              style={{ width: "100%", height: '100%' }}
              src={`http://localhost:5000/${sideVideo.thumbnail}`}
              alt="thumbnail"
            />
          </Link>
        </div>
        {/* 우측 content 부분 */}
        <div className="content">
          <Link to={`/video/${sideVideo._id}`}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {sideVideo.title}
            </span>
            <br />
            <span>{sideVideo.writer.name}</span>
            <br />
            <span>{sideVideo.views}</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
            <br />
          </Link>
        </div>
      </SideVideoBlock>
    );
  });

  return (
    <>
        <div style={{marginTop: '3rem'}}></div>
        {renderSideVideos}
    </>
  )
};

export default SideVideo;
