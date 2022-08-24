import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const EmailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: lightgray;
  margin: 1rem auto 0.25rem;
  padding: 0.6rem;
`;

const EmailInput = styled.input`
  width: 13rem;
  margin-right: 0.25rem;
  height: 1.5rem;
`;

const AuthBnt = styled.button`
  background-color: skyblue;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  height: 1.5rem;
`;

const ErrorMsg = styled.div`
  width: 100%;
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

function EmailComponent() {
  const userEmail = 'example@example.com';

  const [emailInput, setEmailInput] = useState(userEmail);
  const [errMsg, setErrMsg] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const isValidEmail = (email: string) => {
    let isEmailValid = true;
    const regExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regExp.test(email)) isEmailValid = false;
    return isEmailValid;
  };

  const handleAuthBntClick = () => {
    if (emailInput === userEmail) setErrMsg('현재 사용중이신 이메일입니다.');
    else if (!isValidEmail(emailInput)) setErrMsg('이메일 형식이 올바르지 않습니다.');
    else {
      axios
        .post(
          `/email`,
          { email: emailInput },
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            alert(res.data.data.auth);
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  return (
    <EmailWrapper>
      <EmailInput onChange={handleInput} value={emailInput} />
      <AuthBnt onClick={handleAuthBntClick}>인증메일 전송</AuthBnt>
      <ErrorMsg style={{ display: !errMsg ? 'none' : 'block' }}>{errMsg}</ErrorMsg>
    </EmailWrapper>
  );
}

export default EmailComponent;
