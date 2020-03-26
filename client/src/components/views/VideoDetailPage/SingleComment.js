import React, { useState } from "react";
import { Comment, Avatar, Input } from "antd";
import axios from "axios";
import { useSelector } from 'react-redux';
import LikeDisLike from './LikeDisLike';

const { TextArea } = Input;

const SingleComment = ({ videoId, comment, refreshComments }) => {
  const [visible, setVisible] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const { auth } = useSelector(state => ({
    auth: state.auth.auth,
  }))

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
      writer: auth._id,
      videoId,
      responseTo: comment._id //
    };

    // comment 저장 api
    axios.post("/api/comment/saveComment", variables).then(response => {
      if (response.data.success) {
        // console.log(response.data.comment);
        
        // 전체 comments 상태 업데이트
        refreshComments(response.data.comment);
        setCommentValue('');
        setVisible(!visible)
      } else {
        alert("Failed save comment");
      }
    });
  };

  const actions = [
    // 좋아요 싫어요
    <LikeDisLike comment commentId={comment._id} userId={auth._id} /> ,
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to
    </span>
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        content={<p>{comment.content}</p>}
        avatar={<Avatar src={comment.writer.image} alt="user-img" />}
      />

      {/* true일 때만 보이도록 설정 */}
      {visible && (
        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <TextArea
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
