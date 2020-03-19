import React, { useState, useEffect } from 'react';
import RegisterPage from '../components/views/RegisterPage/RegisterPage';
import { registerUser } from '../_actions/userAction';
import { changeFiled, initialForm } from '../_actions/formAction';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';;

const RegisterContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { form, userError, userInfo, auth } = useSelector(state => ({
        form: state.form.register,
        userError: state.user.userError,
        userInfo: state.user.userInfo,
        auth: state.auth.auth,
    }));
    const [error, setError] = useState('');

    useEffect(()=>{
        dispatch(initialForm('register'));
    }, [dispatch]);

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            changeFiled({
                form: 'register',
                name,
                value
            })
        )
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, name, password, passwordConfirm } = form;
        // 빈칸 체크
        if ([email, password, name].includes('')) {
            setError('빈칸 입력');
            return;
        };
        // 비밀번호 체크
        if(password !== passwordConfirm){
            setError('비밀번호가 다릅니다.');
            return;
        };

        // register api 호출
        dispatch(registerUser({ email, password, name, passwordConfirm }));
    };
    // 회원가입 오류 처리
    useEffect(() => {
        if (userError) {
            if (userError.response.status === 409) {
                setError('아이디 중복');
                return;
            }
            setError('회원가입 오류');
            return;
        }
    }, [userError])
    // 회원가입 성공 처리
    useEffect(() => {
        // if (userInfo.success || auth) {
        if (userInfo.success) {
            history.push('/login');
            // userInfo.success= '';
        }
    }, [auth, userInfo.success, history]);

    return (
        <RegisterPage form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
    );
};

export default withRouter(RegisterContainer);