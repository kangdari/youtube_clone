import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../_actions/userAction";
import Button from "../../Common/Button";
import styled from "styled-components";
import Responsive from "../../Common/Responsive";
import { withRouter } from "react-router-dom";

// fixed 안에 flex 적용
const NavBarBlock = styled.div`
  /* position: fixed; */
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

const NavBar = ({ history }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => ({
    auth: state.auth.auth
  }));

  const onLogout = () => {
    // localStorage에서 auth 정보 삭제 > 새로고침 시 자동 로그인 안됨.
    localStorage.removeItem("auth");
    dispatch(logout()).then(response => {
      // 로그아웃 성공 시 홈으로 이동
      if (response.payload.logoutSuccess) {
        history.push("/");
      }
    });
  };

  const onVideoUpload = () => {
    console.log("upload");
  };

  return (
    <NavBarBlock>
      <Wrapper>
        <h2 className="logo">Logo</h2>
        <div className="leftMenu">
          <Button to="/">Home</Button>
          <Button to="/subscription">Sub</Button>
        </div>
        <div className="rightMenu">
          {auth.isAuth ? (
            <>
              <Button to="/video/upload" onClick={onVideoUpload}>
                VideoUpload
              </Button>
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

export default withRouter(NavBar);
