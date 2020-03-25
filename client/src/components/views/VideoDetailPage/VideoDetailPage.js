import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from './SideVideo';
import Subscribe from './Subscribe';
import Comment from './Comment';

const VideoDetailPage = ({ match }) => {
  const [videoDetail, setVideoDetail] = useState([]);
  const videoId = match.params.videoID;

  useEffect(() => {
    // 파라미터 읽기
    const variable = { videoId };
  
    axios.post("/api/video/getVideoDetail", variable).then(response => {
      if (response.data.success) {
        // console.log(response.data);
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("Failed load videoInfo");
      }
    });
  }, [videoId]);

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
              // userTo: 해당 비디오 작성자의 id 값을 props로 전달
              actions={[<Subscribe userTo={videoDetail.writer._id} />]}
            >
              <List.Item.Meta
                // writer.image 필요
                avatar={<Avatar src={videoDetail.writer.image} />}
                title={videoDetail.writer.name} // us er name
                description={videoDetail.description}
              />
            </List.Item>

            {/* 댓글  */}
            <Comment videoId={videoId}/>

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
