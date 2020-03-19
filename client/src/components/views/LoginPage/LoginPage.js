import React from "react";
import styled from "styled-components";
import Button from '../../Common/Button';
import palette from '../../../utils/palette';
import AuthTemplate from '../../Common/AuthTemplate';

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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  button{
    margin-top: 2rem;
  }
`;

const LoginPage = ({ form, onChange, onSubmit, error }) => {
  const { email, password } = form;

  return (
    <>
      <AuthTemplate>
        <LoginForm onSubmit={onSubmit}>
          <StyledInput
            name="email"
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

          {error ? <ErrorMessage>{error}</ErrorMessage> : ""}
          <Button type="submit" cyan fullWidth >로그인</Button>
        </LoginForm>
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
