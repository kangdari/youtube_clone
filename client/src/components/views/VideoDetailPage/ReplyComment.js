import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';


const ReplyComment = ({ comments, videoId, refreshComments, parentCommentId }) => {
    const [childCommentNum, setChildCommentNum] = useState('');
    const [openReplyComment, setOpenReplyComment] = useState(false);

    useEffect(() => {
        let commentNumber = 0;

        comments.map(comment => {
            // 같은 depth의 comment 갯수 
            if (comment.responseTo === parentCommentId) {
                commentNumber++;
            }
        })

        setChildCommentNum(commentNumber);
    }, [comments, parentCommentId])

    const renderReplyCommnets = (parentCommentId) =>
        // console.log(parentCommentId)
        comments.map((comment, i) => (
            <>
                {/* 부모 comment의 id와 responseTo가 같은 comment만 보이도록 설정  */}
                {comment.responseTo === parentCommentId &&
                    <div style={{ marginLeft: '3rem'}}>
                        <SingleComment videoId={videoId} comment={comment} refreshComments={refreshComments} />
                        <ReplyComment 
                            videoId={videoId}
                            comments={comments}
                            parentCommentId={comment._id}
                            refreshComments={refreshComments}
                        />
                    </div>
                }
            </>
        ))


    const handleClick = () => {
        setOpenReplyComment(!openReplyComment);
    }

    return (
        <div>
            {childCommentNum > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'grey' }} onClick={handleClick}>
                    View {childCommentNum} more comment(s)
                </p>
            }
            { openReplyComment && renderReplyCommnets(parentCommentId) }
        </div>
    );
};

export default ReplyComment;