import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import axios from "axios";

const { TextArea } = Input;

const SingleComment = ({ videoId, writer, comment }) => {
  const [visible, setVisible] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  // Reply form 렌더링 여부
  const openReply = () => {
    setVisible(!visible);
  };

  const handleChange = e => {
    setCommentValue(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    let variables = {
      content: commentValue,
      // writer: JSON.parse(localStorage.getItem('auth'))._id, // local 저장소에서 가져온 id 값
      writer, // 부모 컴포넌트에서 props로 전달 받음, auth._id 값
      videoId,
      responseTo: comment._id //
    };

    // comment 저장 api
    axios.post("/api/comment/saveComment", variables).then(response => {
      if (response.data.success) {
        console.log(response.data.comment);
      } else {
        alert("Failed save comment");
      }
    });
  };

  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to
    </span>
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        content={comment.content}
        avatar={<Avatar src={comment.writer.image} alt="user-img" />}
      />

      {/* true일 때만 보이도록 설정 */}
      {visible && (
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
      )}
    </div>
  );
};

export default SingleComment;
