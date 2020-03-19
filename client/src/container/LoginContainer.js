import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFiled, initialForm } from '../_actions/formAction';
import { loginUser } from '../_actions/userAction';
import { authCheck } from '../_actions/authAction';
import LoginPage from '../components/views/LoginPage/LoginPage';
import { withRouter } from 'react-router-dom';

const LoginContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { form, userInfo, userError, auth } = useSelector(({ form, user, auth }) => ({
        form: form.login,
        userInfo: user.userInfo,
        userError: user.userError,
        auth: auth.auth, // 로그인 여부 체크 
    }))
    const [error, setError] = useState('');

    useEffect(()=>{
        dispatch(initialForm('login'));
    }, [dispatch]);

    const onChange = e => {
        const { name, value } = e.target;
        dispatch(
            changeFiled({
                form: 'login',
                name,
                value,
            })
        )
    };

    const onSubmit = e => {
        e.preventDefault();
        const { email, password } = form; // input에 입력한 값
        // empty check
        if([email, password].includes('')){
            setError('빈칸 입력');
            return;
        }
        // login
        // dispatch(loginUser({ email, password }));
        dispatch(loginUser({ email, password }))
    };
    // 로그인 오류 처리
    useEffect(()=>{
        if(userError){
            console.log(userError.response)
            if(userError.response.status === 401){
                setError('email or password error');
                return;
            }else{
                setError('login error');
                return;
            }
        }
    }, [userError]); 

    // 로그인 성공 처리
    useEffect(()=>{
        if(userInfo.loginSuccess){
            dispatch(authCheck());
        }
    }, [ dispatch,  userInfo.loginSuccess]);

    useEffect(() => {
        if(auth.isAuth){
            // 성공 시 home으로 이동
            history.push('/');
            try{
                localStorage.setItem('auth', JSON.stringify(auth)); // 로그인 유저 정보 저장
            }catch(err){
                throw err;
            }
        }
    }, [history, auth])

    return (
        <LoginPage form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
    );
};

export default withRouter(LoginContainer);