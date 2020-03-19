import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import rootReducer from './_reducers'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';

import { setUser, authCheck } from './_actions/authAction';

import 'antd/dist/antd.css';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk, reduxPromise)));

// 새로고침 시 자동 로그인
const loadUser = () =>{
    const user = localStorage.getItem('auth');
    if(!user) return; // 비로그인 상태
    // localStorage에 저장된 auth 정보를 리덕스 상태에 저장
    store.dispatch(setUser(user));
    // 로그인 유저 정보가 현재 로그인한 유저와 일치하는지 서버에서 확인
    // token 비교
    // 일치하면 자동 로그인 처리됨.
    store.dispatch(authCheck());  
};

loadUser();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
