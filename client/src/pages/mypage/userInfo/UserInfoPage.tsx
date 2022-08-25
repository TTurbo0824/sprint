import React, { useState } from 'react';
import styled from '@emotion/styled';
import EmailComponent from './EmailComponent';
import PasswordComponent from './PasswordComponent';

const WrapperDiv = styled.div`
  width: 60rem;
  margin: 0 auto;
  padding: 2rem;
`;

const InfoContainer = styled.section``;

const InfoTable = styled.table`
  width: 100%;
  font-size: 0.85rem;
  border-collapse: collapse;
  border-top: 2px solid gray;
`;

const LeftTd = styled.td`
  background-color: lavender;
  width: 9rem;
  font-weight: bold;
  border-right: 1px solid lightgray;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid lightgray;
`;

const RightTd = styled.td`
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid lightgray;
`;

function UserInfoPage() {
  const userInformation = {
    email: process.env.REACT_APP_USER_EMAIL,
    name: '테스트',
    mobile: '01012341234',
    password: 'qwer1234',
    address: '경기 성남시 분당구 탄청상로151번길 20 월드쇼핑 A동 4층',
    zipCode: '13636',
  };

  const [userInfo, setUserInfo] = useState(userInformation);
  const [emailCom, setEmailCom] = useState(false);

  const handleEmailComClick = () => {
    if (emailCom) setEmailCom(false);
    else setEmailCom(true);
  };

  const fields: { [key: string]: number | string | JSX.Element } = {
    '아이디(이메일)': (
      <div>
        <span style={{ marginRight: '1rem' }}>{userInfo.email}</span>
        <button type="button" onClick={handleEmailComClick}>
          {emailCom ? '이메일 변경취소' : '이메일 변경'}
        </button>
        {emailCom ? <EmailComponent userEmail={userInfo.email || ''} /> : null}
      </div>
    ),
    이름: userInfo.name,
    '휴대폰 번호': userInfo.mobile,
    비밀번호: <PasswordComponent />,
    배송지: userInfo.address,
  };

  return (
    <WrapperDiv>
      <InfoContainer>
        <h2>회원정보 수정</h2>
        <InfoTable>
          <tbody>
            {Object.keys(fields).map((el) => (
              <tr key={el}>
                <LeftTd>{el}</LeftTd>
                <RightTd>{fields[el]}</RightTd>
              </tr>
            ))}
          </tbody>
        </InfoTable>
      </InfoContainer>
    </WrapperDiv>
  );
}

export default UserInfoPage;
