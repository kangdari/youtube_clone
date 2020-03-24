import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from './SideVideo';
import Subscribe from './Subscribe';

const VideoDetailPage = ({ match }) => {
  const [videoDetail, setVideoDetail] = useState([]);

  const videoId = match.params.videoID;
  const variable = { videoId: videoId };

  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variable).then(response => {
      if (response.data.success) {
        // console.log(response.data);
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("Failed load videoInfo");
      }
    });
  }, []);

  // videoDetail.writer 로딩 여부에 따라 렌더링을 다르게 설정
  if (videoDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${videoDetail.filePath}`}
              controls
            />

            {/* user 정보 */}
            <List.Item
              // 좋아요 싫어요
              actions={[<Subscribe />]}
            >
              <List.Item.Meta
                // writer.image 필요
                avatar={<Avatar src={videoDetail.writer.image} />}
                title={videoDetail.writer.name} // user name
                description={videoDetail.description}
              />
            </List.Item>

            {/* comments */}
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default VideoDetailPage;
