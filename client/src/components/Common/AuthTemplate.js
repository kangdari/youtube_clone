import React from 'react';
import styled from 'styled-components';
import palette from '../../utils/palette';

// 회원가입, 로그인 페이지의 레이아웃 담당

// 화면 전체를 채움
const AuthTemplateBlock = styled.div`
    position: absolute;
    top: 80px;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${palette.gray[2]};
    /* // flex로 내부 중앙 정렬 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// 흰색 박스
const WhiteBox = styled.div`
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    width: 360px;
    background: white;
    border-radius: 7px;
`;

const AuthTemplate = ({ children }) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                {children}
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;