import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./SideVideo";
import Subscribe from "./Subscribe";
import Comment from "./Comment";
import LikeDisLike from './LikeDisLike';
import { useSelector } from 'react-redux';

const VideoDetailPage = ({ match }) => {
  const [videoDetail, setVideoDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const videoId = match.params.videoID;
  const { auth } = useSelector(state => ({
    auth: state.auth.auth,
  }))

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
    // 모든 commetn의 정보들을 DB에서 불러오기, 인자 값은 해당 video의 id
    axios.post("/api/comment/getComments", variable).then(response => {
      if (response.data.success) {
        setComments(response.data.comments);
        console.log(`전체 댓글`);
        console.log(response.data.comments);
      } else {
        alert("Failed load Comments");
      }
    });
  }, [videoId]);

  const refreshComments = (newComment) => {
    // 기존 comments에 새로 입력된 comment를 연결
    setComments(comments.concat(newComment));
  };

  // videoDetail.writer 로딩 여부에 따라 렌더링을 다르게 설정
  if (videoDetail.writer) {
    // 로그인 user가 자신이 업로드한 video는 구독하지 못하도록 설정
    // 즉, 현재 로그인 user id와 video 게시자의 id가 같지 않을때 구독 버튼이 보이도록 설정
    const subscribeButton = videoDetail.writer._id !== auth._id && <Subscribe userTo={videoDetail.writer._id} />

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
              // video 관련 - 좋아요 싫어요
              actions={[ <LikeDisLike video userId={auth._id} videoId={videoId} />, subscribeButton]}
            >
              <List.Item.Meta
                // writer.image 필요
                avatar={<Avatar src={videoDetail.writer.image} />}
                title={videoDetail.writer.name} // us er name
                description={videoDetail.description}
              />
            </List.Item>

            {/* 댓글  */}
            <Comment videoId={videoId} comments={comments} refreshComments={refreshComments}/>
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
