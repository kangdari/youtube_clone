import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";

const { TextArea } = Input;

const SingleComment = () => {
  const [visible, setVisible] = useState(false);
  // Reply form 렌더링 여부
  const openReply = () => {
    setVisible(!visible);
  };

  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to
    </span>
  ];

  return (
    <div>
      <Comment actions={actions} author avatar={<Avatar src alt />} />
      {/* true일 때만 보이도록 설정 */}
      {visible && (
        <form style={{ display: "flex" }} onSubmit>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange
            value
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
