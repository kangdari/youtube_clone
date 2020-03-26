import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined, LikeFilled, DislikeFilled } from "@ant-design/icons";

const LikeDisLike = ({ video, videoId, userId, commentId }) => {
    const [likes, setLikes] = useState(0); // 좋아요 개수
    const [liked, setLiked] = useState(false); // 좋아요 상태
    
    const [dislikes, setDislikes] = useState(0); // 싫어요 개수
    const [disliked, setDisliked] = useState(false); // 싫어요 상태


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
                    
                    // 해당 video의 총 좋아요 개수
                    setLikes(response.data.likes.length);
                    
                    // 현재 user가 해당 video를 이미 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        // like의 userId와 현재 user의 id를 비교
                        if(like.userId === userId){
                            setLiked(true); // 이미 좋아요 누른 상태
                        }else{
                            setLiked(false);
                        }
                    })

                }else {
                    alert('Failed load likes');
                }
            })

        axios.post('/api/like/getDisLikes', variable)
            .then(response => {
                if(response.data.success){

                    // 해당 video의 총 싫어요 개수
                    setDislikes(response.data.dislikes.length);

                    // 현재 user가 해당 video를 이미 싫어요를 눌렀는지
                    response.data.dislikes.map(dislike => {
                        // dislike의 userId와 현재 user의 id 비교
                        if(dislike.userId === userId){
                            setDisliked(true); // 이미 싫어요 누른 상태
                        }else{
                            setDisliked(false);
                        }
                    })

                }else{
                    alert('Failed load dislikes');
                }
            })
        
    })

    return (
        <div>
            {/* 좋아요 */}
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    { liked ? <LikeFilled onClick/> : <LikeOutlined onClick/> }
                </Tooltip>
            </span>
            <span style={{ paddingLeft: '0.5rem', cursor: 'auto'}}> {likes} </span>

            {/* 싫어요 */}
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    { disliked ? <DislikeFilled onClick/> : <DislikeOutlined onClick/> }
                </Tooltip>
            </span>
            <span style={{ paddingLeft: '0.5rem', cursor: 'auto'}}> {dislikes} </span>

        </div>
    );
};

export default LikeDisLike;