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

const Msg = styled.div`
  width: 100%;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  white-space: pre-line;
`;

type EmailProp = {
  userEmail: string;
};

function EmailComponent({ userEmail }: EmailProp) {
  const [emailInput, setEmailInput] = useState(userEmail);
  const [validInput, setValidInput] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [validNum, setValidNum] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === 'email') setEmailInput(e.target.value);
    else if (type === 'validator') setValidInput(e.target.value);
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
      console.log('sent');
      setIsEmailSent(true);
      setValidNum('123456');
      setErrMsg('');
      // axios
      //   .post(
      //     '/api/email/auth',
      //     { email: emailInput },
      //     {
      //       headers: {
      //         // Authorization: `Bearer ${token}`,
      //         'Content-Type': 'application/json',
      //       },
      //     },
      //   )
      //   .then((res) => {
      //     if (res.status === 200) {
      //       setIsEmailSent(true);
      //       setErrMsg('');
      //       setValidNum(res.data.data.valid_num)
      //     }
      //   })
      //   .catch((error) => {
      //     alert(error);
      //   });
    }
  };

  const changeEmailRequest = () => {
    if (!validInput) {
      setErrMsg('인증번호를 입력해주세요.');
    } else if (validInput !== validNum) {
      setErrMsg('잘못된 인증번호입니다.');
    } else {
      window.location.reload();
      // axios
      //   .patch(
      //     '/api/email',
      //     { email: process.env.REACT_APP_USER_EMAIL, updateEmail: emailInput },
      //     {
      //       headers: {
      //         // Authorization: `Bearer ${token}`,
      //         'Content-Type': 'application/json',
      //       },
      //     },
      //   )
      //   .then((res) => {
      //     if (res.status === 200) {
      //       // 로그아웃 처리
      //     }
      //   })
      //   .catch((error) => {
      //     alert(error);
      //   });
    }
  };

  return (
    <EmailWrapper>
      {!isEmailSent ? (
        <>
          <EmailInput onChange={(e) => handleInput(e, 'email')} value={emailInput} />
          <AuthBnt onClick={handleAuthBntClick}>인증메일 전송</AuthBnt>
          <ErrorMsg style={{ display: !errMsg ? 'none' : 'block' }}>{errMsg}</ErrorMsg>
        </>
      ) : (
        <>
          <Msg>
            신청하신 이메일(<span style={{ color: 'blue', fontWeight: 'bold' }}>{emailInput}</span>)로 인증 이메일이
            발송되었습니다.{'\n'}
            이메일로 받으신 인증번호를 아래 입력창에 입력하신 뒤 확인 버튼을 클릭하시면 이메일 변경이 완료됩니다.
          </Msg>
          <EmailInput onChange={(e) => handleInput(e, 'validator')} value={validInput} />
          <AuthBnt onClick={changeEmailRequest}>확인</AuthBnt>
          <ErrorMsg style={{ display: !errMsg ? 'none' : 'block' }}>{errMsg}</ErrorMsg>
        </>
      )}
    </EmailWrapper>
  );
}

export default EmailComponent;
