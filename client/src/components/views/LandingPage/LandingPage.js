import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Card, Avatar, Col, Typography, Row } from "antd";
import { Link } from "react-router-dom";
import palette from "../../../utils/palette";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

const LandingPageBlock = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  flex-direction: column;
`;

const CardBlock = styled.div`
  position: relative;

  img {
    width: 100%;
  }

  .duration {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 2px 4px;
    margin: 4px;
    background: black;
    opacity: 0.6;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 800;
    color: #fff;
    line-height: 12px;
  }
`;

const LandingPage = () => {
  // video 목록 상태
  const [videos, setVideos] = useState([]);
  // LanndingPage 렌더링 시 비디오 목록 불러오기
  useEffect(() => {
    axios.get("/api/video/getVideos").then(response => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("failed load video");
      }
    });
  }, []);

  const renderCards = videos.map((video, i) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);
    // video card 렌더링
    return (
      <Col key={i} xl={6} lg={8} md={12} xs={24}>
        <CardBlock>
          {/* videoDetailPage로 연결 */}
          <Link to={`/video/${video._id}`}>
            <img alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`}  />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </Link>
        </CardBlock>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description
        />
        <span>{video.writer.name} </span>
        <br />
        <span style={{ marginLeft: "3rem" }}> {video.views} views - </span>
        <span> {moment(video.createdAt).format("MMM Do YY")} </span>
      </Col>
    );
  });

  return (
    <LandingPageBlock>
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Title level={2}> Recommended </Title>
        <hr />
        {/* gutter: 양쪽 padding 합 ? */}
        <Row gutter={[32, 16]}>{renderCards}</Row>
      </div>
    </LandingPageBlock>
  );
};

export default LandingPage;