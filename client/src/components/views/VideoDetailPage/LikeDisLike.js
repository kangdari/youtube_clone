import React, { useEffect } from 'react';
import axios from 'axios';
import { Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined, LikeFilled, DislikeFilled } from "@ant-design/icons";

const LikeDisLike = ({ video, videoId, userId, commentId }) => {
    let variable = {};
    // video의 좋아요, 싫어요
    if(video) {
        variable = { videoId: videoId, userId: userId };
    // comment의 좋아요, 싫어요
    }else {
        variable = { commentId: commentId, userId: userId };
    }

    // DB에서 좋아요, 싫어요 정보 가져오기
    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
            .then(response => { 
                if(response.data.success){
                    
                }else {
                    alert('Failed load like && dislike')
                }
            })
    })

    return (
        <div>
            {/* 좋아요 */}
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <LikeOutlined onClick/>
                    {/* <LikeFilled onClick/> */}
                </Tooltip>
            </span>
            <span style={{ paddingLeft: '0.5rem', cursor: 'auto'}}> 1 </span>

            {/* 싫어요 */}
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <DislikeOutlined onClick/>
                    {/* <DislikeFilled onClick/> */}
                </Tooltip>
            </span>
            <span style={{ paddingLeft: '0.5rem', cursor: 'auto'}}> 1 </span>

        </div>
    );
};

export default LikeDisLike;