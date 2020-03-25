import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SingleComment from "./SingleComment";

const Comment = ({ videoId }) => {
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
      postId: videoId
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

  return (
    <div>
      <br />
      Replies
      <hr />
      <br />


      {/* comment list */}
      <SingleComment />


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
