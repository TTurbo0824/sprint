import React, { useState } from 'react';
import styled from '@emotion/styled';
import EmailComponent from './EmailComponent';
import PasswordComponent from './PasswordComponent';

type DisplayProps = {
  display: string;
  paddingValue: string | null;
};

const WrapperDiv = styled.div`
  width: 480px;
  height: 800px;
  margin: 0 auto;
  padding: 2rem 1.25rem;
  border: 1px solid lightgray;
  font-size: 0.9rem;
`;

const InfoContainer = styled.section``;

const InnerContainer = styled.div`
  border-top: 2px solid gray;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem;
  border-bottom: 1px solid lightgray;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  td {
    vertical-align: top;
    height: 3rem;
  }
`;

const LeftTd = styled.td<DisplayProps>`
  display: ${(props) => props.display};
  width: 9rem;
  font-weight: bold;
  white-space: pre-line;
  padding: 0.75rem 0;
  padding-left: 0.75rem;
  padding-bottom: ${(props) => props.paddingValue};
`;

const RightTd = styled.td<DisplayProps>`
  display: ${(props) => props.display};
  padding: 0.75rem 0;
  padding-top: ${(props) => props.paddingValue};
`;

const RightContainer = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 1fr 4rem;
`;

const EditBnt = styled.button`
  height: fit-content;
  padding: 0.15rem;
  margin-right: 0.75rem;
`;

export const UserInfoBnt = styled.button`
  width: 100%;
  height: 2.5rem;
  margin-top: 0.75rem;
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

  const infoFields: { [key: string]: number | string | JSX.Element | null } = {
    이름: userInfo.name,
    '아이디\n(이메일)': userInfo.email || '',
    아이디수정: emailCom ? <EmailComponent userEmail={userInfo.email || ''} /> : null,
    '휴대폰 번호': userInfo.mobile,
  };
  const handleUnavailClick = () => {
    alert('현재 서비스 중인 기능이 아닙니다.');
  };

  return (
    <WrapperDiv>
      <InfoContainer>
        <InnerContainer>
          <Title>기본정보</Title>
          <InfoTable>
            <tbody>
              {Object.keys(infoFields).map((el, idx) => (
                <tr key={el}>
                  <LeftTd
                    paddingValue={idx === 1 && emailCom ? '0' : '0.75rem'}
                    display={idx === 2 && !emailCom ? 'none' : 'normal'}
                  >
                    {idx === 2 ? '' : el}
                  </LeftTd>
                  {idx !== 2 ? (
                    <RightTd paddingValue={null} display="normal">
                      <RightContainer>
                        {infoFields[el]}
                        {el === '아이디\n(이메일)' ? (
                          <EditBnt onClick={handleEmailComClick}>{emailCom ? '취소' : '수정'}</EditBnt>
                        ) : (
                          <EditBnt onClick={handleUnavailClick}>수정</EditBnt>
                        )}
                      </RightContainer>
                    </RightTd>
                  ) : (
                    <RightTd paddingValue="0" display={idx === 2 && !emailCom ? 'none' : 'normal'}>
                      {infoFields[el]}
                    </RightTd>
                  )}
                </tr>
              ))}
            </tbody>
          </InfoTable>
        </InnerContainer>
        <InnerContainer>
          <Title>비밀번호 변경</Title>
          <PasswordComponent />
        </InnerContainer>
        <InnerContainer>
          <Title>회원탈퇴</Title>
          회원탈퇴를 원하시면 아래 버튼을 클릭해주세요.
          <UserInfoBnt>탈퇴하기</UserInfoBnt>
        </InnerContainer>
      </InfoContainer>
    </WrapperDiv>
  );
}

export default UserInfoPage;
