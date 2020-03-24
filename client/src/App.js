import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginContainer from './container/LoginContainer';
import RegisterContainer from './container/RegisterContainer';
import NavBar from "./components/views/NavBar/NavBar";
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPage';

import Auth from './hoc/auth';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        {/* null: 아무나, false: 비로그인 유저, true: 로그인 유저 */}
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route path="/login" component={Auth(LoginContainer, false)} />
        <Route path="/register" component={Auth(RegisterContainer, false)} />
        <Route path="/video/upload" component={Auth(VideoUploadPage, true)} />
        <Route path="/video/:videoID" component={Auth(VideoDetailPage, null)} />
      </Switch>
    </>
  );
}

export default App;
