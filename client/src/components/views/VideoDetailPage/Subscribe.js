import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SubscribeButton = styled.button`
    outline: none;
    border: none;
    border-radius: 5px;
    background: #CC0000;
    color: white;
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
`;

const Subscribe = ({ userTo }) => {
    // 해당 비디오를 업로드한 유저를 구독한 유저의 수
    const [subscribeNumber, setSubscribeNumber] = useState('');

    // userTo: 비디오를 업로드한 유저의 id
    const variable = {
         userTo: userTo
    }

    useEffect(() => {
        // 해당 비디오를 업로드한 유저를 구독하는 유저의 수... 
        axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if(response.data.success){
                    //  console.log(response.data);
                     setSubscribeNumber(response.data.subscribeNumber);
                }else{
                    alert('구독자 수 정보를 받아 오지 못함.')
                }
            })
    }, []);

    return (
        <div>
            <SubscribeButton onClick>0 SUBSCRIBE</SubscribeButton>
        </div>
    );
};

export default Subscribe;