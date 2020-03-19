import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LandingPageBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const LandingPage = () => {

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => { console.log(response.data) });
    }, []);

    return (
        <>
            <LandingPageBlock>
                <h1>LandingPage</h1>
            </LandingPageBlock>
        </>

    );
};

export default LandingPage;