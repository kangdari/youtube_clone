import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  LikeFilled,
  DislikeFilled
} from "@ant-design/icons";

const LikeDisLike = ({ video, videoId, userId, commentId }) => {
  const [likes, setLikes] = useState(0); // 좋아요 개수
  const [liked, setLiked] = useState(false); // 좋아요 상태

  const [dislikes, setDislikes] = useState(0); // 싫어요 개수
  const [disliked, setDisliked] = useState(false); // 싫어요 상태

  let variable = {};
  // video의 좋아요, 싫어요
  if (video) {
    variable = { videoId: videoId, userId: userId };
    // comment의 좋아요, 싫어요
  } else {
    variable = { commentId: commentId, userId: userId };
  }

  // DB에서 좋아요, 싫어요 정보 가져오기
  useEffect(() => {
    axios.post("/api/like/getLikes", variable).then(response => {
      if (response.data.success) {
        // 해당 video의 총 좋아요 개수
        setLikes(response.data.likes.length);

        // 현재 user가 해당 video를 이미 좋아요를 눌렀는지
        response.data.likes.map(like => {
          // like의 userId와 현재 user의 id를 비교
          if (like.userId === userId) {
            setLiked(true); // 이미 좋아요 누른 상태
          } else {
            setLiked(false);
          }
        });
      } else {
        alert("Failed load likes");
      }
    });

    axios.post("/api/like/getDisLikes", variable).then(response => {
      if (response.data.success) {
        // 해당 video의 총 싫어요 개수
        setDislikes(response.data.dislikes.length);

        // 현재 user가 해당 video를 이미 싫어요를 눌렀는지
        response.data.dislikes.map(dislike => {
          // dislike의 userId와 현재 user의 id 비교
          if (dislike.userId === userId) {
            setDisliked(true); // 이미 싫어요 누른 상태
          } else {
            setDisliked(false);
          }
        });
      } else {
        alert("Failed load dislikes");
      }
    });
  }, []);

  // 좋아요 함수
  const onLike = () => {
    // 좋아요 누르지 않은 상태 > 이 상태에서 누르면 좋아요 +1
    if (!liked) {
      // variable : video, comment 각각 다르게 설정
      axios.post("/api/like/upLike", variable).then(response => {
        if (response.data.success) {
          setLikes(likes + 1); // 좋아요 개수 +1
          setLiked(true); // 좋아요 상태 > 누른 상태로 변화

          // 싫어요가 이미 눌린 상태 라면
          if (disliked) {
            setDislikes(dislikes - 1); // 싫어요 개수 -1
            setDisliked(false); // 싫어요 상태 > 안 누른 상태로 변화
          }
        } else {
          alert("Failed upLike");
        }
      });
    } else {
      // 좋아요가 눌린 상태 > 이 상태에서 누르면 좋아요 -1
      axios.post("/api/like/downLike", variable).then(response => {
        if (response.data.success) {
          setLikes(likes-1); // 좋아요 개수 -1
          setLiked(false); // 좋아요 상태 > 안 누른 상태로 변화
        } else {
          alert("Failed downLike");
        }
      });
    }
  };

  // 싫어요 함수
  const onDislike = () => {
    // 싫어요 누르지 않은 상태 > 이 상태에서 누르면 싫어요 +1
    if (!disliked) {
      axios.post("/api/like/upDisLike", variable).then(response => {
        if (response.data.success) {
          setDislikes(dislikes + 1); // 싫어요 개수 +1
          setDisliked(true); // 싫어요 누른 상태로 변경

          // 좋아요가 눌린 상태라면
          if (liked) {
            setLikes(likes - 1); // 좋아요 개수 -1
            setLiked(false); // 좋아요 안 누른 상태로 변경
          }
        } else {
          alert("Failed upDisLike");
        }
      });
      // 싫어요 눌린 상태 > 이 상태에서 누르면 싫어요 -1
    } else {
      axios.post("/api/like/downDisLike", variable).then(response => {
        if (response.data.success) {
          setDislikes(dislikes - 1); // 싫어요 개수 -1
          setDisliked(false); // 싫어요 안 누른 상태로 변경
        } else {
          alert("Failed downDisLike");
        }
      });
    }
  };

  return (
    <div>
      {/* 좋아요 */}
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {liked ? (
            <LikeFilled onClick={onLike} />
          ) : (
            <LikeOutlined onClick={onLike} />
          )}
        </Tooltip>
      </span>
      <span style={{ paddingLeft: "0.5rem", cursor: "auto" }}>{likes}</span>

      {/* 싫어요 */}
      <span key="comment-basic-dislike" style={{ paddingLeft: "0.5rem" }}>
        <Tooltip title="Dislike">
          {disliked ? (
            <DislikeFilled onClick={onDislike} />
          ) : (
            <DislikeOutlined onClick={onDislike} />
          )}
        </Tooltip>
      </span>
      <span style={{ padding: "0 0.5rem", cursor: "auto" }}>{dislikes}</span>
    </div>
  );
};

export default LikeDisLike;
