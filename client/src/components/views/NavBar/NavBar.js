import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../_actions/userAction";
import Button from "../../Common/Button";
import styled from "styled-components";
import Responsive from "../../Common/Responsive";

// fixed 안에 flex 적용
const NavBarBlock = styled.div`
  position: fixed;
  width: 100%;
`;

const Wrapper = styled(Responsive)`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;

  .logo .leftMenu,
  .rightMenu {
    flex: none;
  }
  .logo {
    margin-left: 40px;
  }
  .leftMenu {
    margin-left: 40px;
  }

  .rightMenu {
    margin-left: auto;
    margin-right: 60px;
  }
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => ({
    auth: state.auth.auth
  }));

  const onLogout = () => {
    dispatch(logout());
    // localStorage에서 auth 정보 삭제 > 새로고침 시 자동 로그인 안됨.
    localStorage.removeItem("auth");
  };

  const onVideoUpload = () => {
    console.log('upload');
  }

  return (
    <NavBarBlock>
      <Wrapper>
        <h2 className="logo">Logo</h2>
        <div className="leftMenu">
          <Button to="/">Home</Button>
          <Button to="/sub">Sub</Button>
        </div>
        <div className="rightMenu">
          {auth.isAuth ? (
            <>
              <Button to='/video/upload' onClick={onVideoUpload}>VideoUpload</Button>
              <Button onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button to="/register">Register</Button>
              <Button to="/login">Login</Button>
            </>
          )}
        </div>
      </Wrapper>
    </NavBarBlock>
  );
};

export default NavBar;
