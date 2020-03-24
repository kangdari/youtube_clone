import React from 'react';
import styled from 'styled-components';

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


const Subscribe = () => {
    return (
        <div>
            <SubscribeButton onClick>0 SUBSCRIBE</SubscribeButton>
        </div>
    );
};

export default Subscribe;