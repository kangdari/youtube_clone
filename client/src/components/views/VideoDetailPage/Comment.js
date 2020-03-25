import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SingleComment from "./SingleComment";

const Comment = ({ comments, videoId, refreshComments }) => {
  const [commentValue, setCommentValue] = useState("");
  const { auth } = useSelector(state => ({
    auth: state.auth.auth
  }));

  const handleChange = e => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    let variables = {
      content: commentValue,
      // writer: JSON.parse(localStorage.getItem('auth'))._id, // local 저장소에서 가져온 id 값
      writer: auth._id, // redux store에서 가져온 id 값
      videoId
    };

    // comment 저장 api, 입력한 댓글을 DB에 저장
    axios.post("/api/comment/saveComment", variables).then(response => {
      if (response.data.success) {
        // console.log(response.data.comment);

        // VideoDetailPage의 comments 상태를 업그레이드 해주는 함수 호출
        // DB에 저장한 comment를 기존 commets와 연결
        refreshComments(response.data.comment);
        setCommentValue("");
      } else {
        alert("Failed save comment");
      }
    });
  };

  return (
    <div>
      <br />
      Replies
      <hr />
      <br />
      {/* comment list */}
      {comments &&
        comments.map(
          (comment, i) =>
            // responseTo가 없는 comment만 출력 == depth가 없는 comment만 출력
            !comment.responseTo && (
              <SingleComment
                key={i}
                videoId={videoId}
                writer={auth._id}
                comment={comment}
                refreshComments={refreshComments}
              />
            )
        )}
      {/* root comment form */}
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={commentValue}
          placeholder="Enter comment..."
        />
        <button style={{ width: "20%" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
