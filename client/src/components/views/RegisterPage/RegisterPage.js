import React from "react";
import styled from "styled-components";
import Button from '../../Common/Button';
import AuthTemplate from '../../Common/AuthTemplate';
import palette from '../../../utils/palette';

const StyledInput = styled.input`
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  outline: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  width: 100%;

  &:focus {
      border-bottom: 1px solid ${palette.gray[7]};
    }
  & + & {
      margin-top: 2rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1.1rem;
  margin: 0.5rem 0;
  font-weight: bold;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;

  button{
    margin-top: 2rem;
  }
`;

const RegisterPage = ({ onChange, form, onSubmit, error }) => {
  const { email, name, password, passwordConfirm } = form;
  // console.log(error); //에러메세지 출력

  return (
    <>
      <AuthTemplate>
        <RegisterForm onSubmit={onSubmit}>
          <StyledInput
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            placeholder="email"
          />
          <StyledInput
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            placeholder="password"
          />
          <StyledInput
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={onChange}
            placeholder="passwordConfirm"
          />
          <StyledInput
            name="name"
            value={name}
            onChange={onChange}
            placeholder="name"
          />
          {error ? <ErrorMessage>{error}</ErrorMessage> : ""}
          <Button type="submit" cyan>회원가입</Button>
        </RegisterForm>

      </AuthTemplate>

    </>
  );
};

export default RegisterPage;
