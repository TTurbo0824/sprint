import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const EmailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-right: 0.75rem;
`;

const Guide = styled.span`
  color: gray;
  margin-bottom: 0.5rem;
`;

const EmailInput = styled.input`
  width: 100%;
  height: 2.25rem;
  margin-bottom: 0.25rem;
`;

const AuthBnt = styled.button`
  width: 100%;
  height: 2.25rem;
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
`;

type EmailProp = {
  userEmail: string;
};

function EmailComponent({ userEmail }: EmailProp) {
  const [emailInput, setEmailInput] = useState('');
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
      // TEST CODE
      // setIsEmailSent(true);
      // setValidNum('123456');
      // setErrMsg('');

      // kyungjoo_ha@tmax.co.kr
      axios
        .post(
          '/api/email',
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
            setIsEmailSent(true);
            setErrMsg('');
            setValidNum(res.data.validNum);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const changeEmailRequest = () => {
    if (!validInput) {
      setErrMsg('인증번호를 입력해주세요.');
    } else if (validInput !== validNum) {
      setErrMsg('잘못된 인증번호입니다.');
    } else {
      axios
        .patch(
          '/api/email',
          { email: process.env.REACT_APP_USER_EMAIL, updateEmail: emailInput },
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            // 로그아웃 처리
            alert('이메일 변경 성공!');
            window.location.reload();
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <EmailWrapper>
      {!isEmailSent ? (
        <>
          <Guide>이메일 변경을 위해서 인증이 필요합니다.</Guide>
          <EmailInput
            onChange={(e) => handleInput(e, 'email')}
            value={emailInput}
            placeholder="변경할 이메일을 입력하세요."
          />
          <AuthBnt onClick={handleAuthBntClick}>인증메일 전송</AuthBnt>
          <ErrorMsg style={{ display: !errMsg ? 'none' : 'block' }}>{errMsg}</ErrorMsg>
        </>
      ) : (
        <>
          <Msg>
            <span style={{ color: 'blue', fontWeight: 'bold' }}>{emailInput}</span>(으)로 인증 이메일이 발송되었습니다.
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
