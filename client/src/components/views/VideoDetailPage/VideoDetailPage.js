import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./SideVideo";
import Subscribe from "./Subscribe";

const VideoDetailPage = ({ match }) => {
  const [videoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    // 파라미터 읽기
    const videoId = match.params.videoID;
    const variable = { videoId };

    axios.post("/api/video/getVideoDetail", variable).then(response => {
      if (response.data.success) {
        // console.log(response.data);
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("Failed load videoInfo");
      }
    });
  }, [match.params.videoID]);

  // videoDetail.writer 로딩 여부에 따라 렌더링을 다르게 설정
  if (videoDetail.writer) {
    // 로그인 user가 자신이 업로드한 video는 구독하지 못하도록 설정
    // 즉, 현재 로그인 user id와 video 게시자의 id가 같지 않을때 구독 버튼이 보이도록 설정
    const subscribeButton = videoDetail.writer._id !==
      JSON.parse(localStorage.getItem("auth"))._id && (
      <Subscribe userTo={videoDetail.writer._id} />
    );

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
              actions={[subscribeButton]}
            >
              <List.Item.Meta
                // writer.image 필요
                avatar={<Avatar src={videoDetail.writer.image} />}
                title={videoDetail.writer.name} // us er name
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
