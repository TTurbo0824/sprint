import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { UserInfoBnt } from './UserInfoPage';

const PasswordContainer = styled.div`
  padding: 1rem 0.5rem;
  .hidden {
    display: none;
  }
  .not-error {
    color: gray;
  }
  .error {
    color: red;
  }
  .passed {
    color: green;
  }
`;

const PasswordInput = styled.input`
  width: 100%;
  height: 2.25rem;
  border: 1px solid darkgray;
  margin-bottom: 0.25rem;
  :not(:first-of-type) {
    margin-top: 0.6rem;
  }
`;

const PasswordErrorMsg = styled.div`
  line-height: 1.2rem;
`;

function PasswordComponent() {
  const URL = process.env.REACT_APP_API_URL;
  const userId = 'example@example.com';
  const userPassword = 'qwer1234';

  interface ErrorObj {
    curNotEmpty: boolean;
    isMixed: boolean;
    isNotRepeat: boolean;
    isNotId: boolean;
    reNotEmpty: boolean;
    reEqual: boolean;
    curEqual: boolean;
  }

  const [edited, setEdited] = useState({
    bntClicked: false, // 비밀번호 변경 버튼 클릭
    newInputClicked: false, // 새 비밀번호 인풋 클릭
    newInputTyped: false, // 새 비밀번호 인풋 입력
    reInputClicked: false, // 비밀번호 다시 입력 인풋 클릭
    reInputTyped: false, // 비밀번호 다시 입력 인풋 입력
  });

  const { bntClicked, newInputClicked, newInputTyped, reInputClicked, reInputTyped } = edited;

  const [editPassword, setEditPassword] = useState({
    curPassword: '',
    newPassword: '',
    passwordRetype: '',
  });

  const { curPassword, newPassword, passwordRetype } = editPassword;

  const [passwordErr, setPasswordErr] = useState<ErrorObj>({
    curNotEmpty: false, // 현재 비밀번호 비어있음
    isMixed: false, // 영문/숫자/특수문자 조합 8~20자
    isNotRepeat: false, // 3개 이상 연속/동일 문자/숫자
    isNotId: false, // 아이디(이메일) 제외
    reNotEmpty: false, // 비밀번호 다시 입력 비어있음
    reEqual: false, // 비밀번호 다시 입력 일치
    curEqual: false, // 현재 비밀번호 일치
  });

  const { isMixed, isNotRepeat, isNotId, reNotEmpty, reEqual } = passwordErr;

  const handleEditBntClick = () => {
    if (!bntClicked) setEdited({ ...edited, bntClicked: true });
    if (curPassword && isMixed && isNotRepeat && isNotId && reNotEmpty && reEqual) {
      axios
        .patch(
          `${URL}/users/password`,
          { email: process.env.REACT_APP_USER_EMAIL, password: curPassword, updatePassword: newPassword },
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            // 로그아웃 진행
            alert('비밀번호가 수정되었습니다.');
            window.location.reload();
          }
        })
        .catch((error) => {
          // TEST CODE
          // if (curPassword !== userPassword) {
          //   setPasswordErr({
          //     ...passwordErr,
          //     curEqual: false,
          //   });
          //   console.log('✨👀✨👀✨👀✨👀');
          // } else {
          //   setPasswordErr({
          //     ...passwordErr,
          //     curEqual: true,
          //   });
          //   alert('비밀번호가 수정되었습니다.');
          //   window.location.reload();
          // }

          if (error.response.data.code === 'EU005') {
            alert('비밀번호가 일치하지 않습니다.');
            setPasswordErr({
              ...passwordErr,
              curEqual: false,
            });
          } else alert(error.response.data.message);
        });
    } else if (curPassword) {
      if (curPassword === userPassword) setPasswordErr({ ...passwordErr, curNotEmpty: true, curEqual: true });
      else setPasswordErr({ ...passwordErr, curNotEmpty: true, curEqual: false });
    } else if (!curPassword && !passwordRetype) {
      setPasswordErr({
        ...passwordErr,
        curNotEmpty: false,
        reNotEmpty: false,
      });
    } else {
      setPasswordErr({
        ...passwordErr,
        curNotEmpty: false,
        reNotEmpty: true,
      });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setEditPassword({ ...editPassword, [key]: e.target.value });

    if (key === 'newPassword') {
      if (!newInputTyped) setEdited({ ...edited, newInputTyped: true });
      isValidPw(e.target.value);
    } else if (key === 'passwordRetype') {
      if (!reInputTyped) setEdited({ ...edited, reInputTyped: true });
      isValidRetype(e.target.value);
    }
  };

  const isValidRetype = (password: string) => {
    if (password) {
      if (newPassword === password) {
        setPasswordErr({
          ...passwordErr,
          reNotEmpty: true,
          reEqual: true,
        });
      } else {
        setPasswordErr({
          ...passwordErr,
          reNotEmpty: true,
          reEqual: false,
        });
      }
    } else {
      setPasswordErr({
        ...passwordErr,
        reNotEmpty: false,
      });
    }
  };

  const isValidPw = (password: string) => {
    let tempError = {
      isMixed: false,
      isNotRepeat: false,
      isNotId: false,
      reEqual: false,
    };

    const numRegex = /(?=.*[0-9]+)/;
    const engRegex = /(?=.*[a-zA-Z]+)/;
    const speRegex = /(?=.*[~!@#$%^&*()_+|<>?:{}`,.=])/;
    const korRegex = /(?=.*[ㄱ-힣])/;

    const num = numRegex.test(password);
    const eng = engRegex.test(password);
    const spe = speRegex.test(password);
    const kor = korRegex.test(password);
    const space = password.includes(' ');

    if (password) {
      if (
        password.length < 8 ||
        password.length > 20 ||
        kor ||
        space ||
        (!num && !eng) ||
        (!num && !spe) ||
        (!spe && !eng)
      ) {
        tempError.isMixed = false;
      } else tempError.isMixed = true;

      if (password.includes(userId.split('@')[0])) tempError.isNotId = false;
      else tempError.isNotId = true;

      if (continuousPw(password)) tempError.isNotRepeat = false;
      else tempError.isNotRepeat = true;

      if (password === passwordRetype) tempError.reEqual = true;
      else tempError.reEqual = false;
    } else {
      tempError = {
        isMixed: false,
        isNotRepeat: false,
        isNotId: false,
        reEqual: false,
      };
    }

    setPasswordErr({
      ...passwordErr,
      ...tempError,
    });
  };

  const continuousPw = (pwd: string) => {
    let isPassed = false;
    let pass1 = 0; // 동일문자카운드
    let pass2 = 0; // 연속성(+) 카운트
    let pass3 = 0; // 연속성(-) 카운트

    let temp1 = '';
    let temp2 = '';
    let temp3 = '';

    for (let i = 0; i < pwd.length; i += 1) {
      temp1 = pwd.charAt(i);
      temp2 = pwd.charAt(i + 1);
      temp3 = pwd.charAt(i + 2);

      // 동일문자 카운트
      if (temp1 === temp2) {
        pass1 += 1;
      }

      // 연속성(+) 카운트
      if (temp1.charCodeAt(0) - temp2.charCodeAt(0) === 1 && temp2.charCodeAt(0) - temp3.charCodeAt(0) === 1) {
        pass2 += 1;
      }

      // 연속성(-) 카운트
      if (temp1.charCodeAt(0) - temp2.charCodeAt(0) === -1 && temp2.charCodeAt(0) - temp3.charCodeAt(0) === -1) {
        pass3 += 1;
      }
    }

    if (pass1 > 1 || pass2 > 0 || pass3 > 0) {
      isPassed = true;
    }
    return isPassed;
  };

  const handleClassName = (type: string) => {
    let finalName = '';
    const { isMixed, isNotRepeat, isNotId, reNotEmpty, reEqual } = passwordErr;
    if (type.includes('password')) {
      if ((!bntClicked && !newInputClicked) || (isMixed && isNotRepeat && isNotId)) finalName = 'hidden';
      else if (!bntClicked && !newInputTyped) finalName = 'not-error';
      else if (type === 'passwordMix') finalName = !isMixed ? 'error' : 'passed';
      else if (type === 'passwordRepeat') finalName = !isNotRepeat ? 'error' : 'passed';
      else if (type === 'passwordId') finalName = !isNotId ? 'error' : 'passed';
    } else if (type.includes('retype')) {
      if (type === 'retypeEqual') {
        if (!bntClicked && (!reNotEmpty || !reInputClicked)) finalName = 'hidden';
        else if (bntClicked && !reNotEmpty) finalName = 'hidden';
        else finalName = !reEqual ? 'error' : 'passed';
      } else if (type === 'retypeTyped') {
        if (bntClicked && !reNotEmpty) finalName = 'error';
        else if (!reInputClicked || reNotEmpty) finalName = 'hidden';
        else finalName = 'not-error';
      }
    }
    return finalName;
  };

  const handleInputClick = (type: string) => {
    if (type === 'new' && !newInputClicked) setEdited({ ...edited, newInputClicked: true });
    if (type === 'retype' && !reInputClicked) setEdited({ ...edited, reInputClicked: true });
  };

  // console.log(passwordErr.curEqual, isMixed, isNotRepeat, isNotId, reNotEmpty, reEqual);
  // console.log(!bntClicked, passwordErr.curEqual, !passwordErr.curNotEmpty);

  return (
    <PasswordContainer>
      <PasswordInput placeholder="현재 비밀번호를 입력하세요." onChange={(e) => handleInput(e, 'curPassword')} />
      <PasswordErrorMsg className={!bntClicked || passwordErr.curNotEmpty ? 'hidden' : 'error'}>
        현재 비밀번호를 입력해주세요
      </PasswordErrorMsg>
      <PasswordErrorMsg
        className={!bntClicked || passwordErr.curEqual || !passwordErr.curNotEmpty ? 'hidden' : 'error'}
      >
        현재 비밀번호가 일치하지 않습니다.
      </PasswordErrorMsg>
      <PasswordInput
        placeholder="새 비밀번호를 입력하세요."
        onChange={(e) => handleInput(e, 'newPassword')}
        onClick={() => handleInputClick('new')}
      />
      <PasswordErrorMsg className={handleClassName('passwordMix')}>
        <span>{!passwordErr.isMixed ? '×' : '✓'}</span> 영문/숫자/특수문자 2가지 이상 조합 (8~20자)
      </PasswordErrorMsg>
      <PasswordErrorMsg className={handleClassName('passwordRepeat')}>
        {!passwordErr.isNotRepeat ? '×' : '✓'} 3개 이상 연속되거나 동일한 문자/숫자 제외
      </PasswordErrorMsg>
      <PasswordErrorMsg className={handleClassName('passwordId')}>
        {!passwordErr.isNotId ? '×' : '✓'} 아이디(이메일) 제외
      </PasswordErrorMsg>
      <PasswordErrorMsg
        className={passwordErr.isMixed && passwordErr.isNotRepeat && passwordErr.isNotId ? 'passed' : 'hidden'}
      >
        ✓ 사용 가능한 비밀번호입니다.
      </PasswordErrorMsg>
      <PasswordInput
        placeholder="새 비밀번호를 한번 더 확인해주세요."
        onChange={(e) => handleInput(e, 'passwordRetype')}
        onClick={() => handleInputClick('retype')}
      />
      <PasswordErrorMsg className={handleClassName('retypeTyped')}>
        × 확인을 위해 새 비밀번호를 다시 입력해주세요.
      </PasswordErrorMsg>
      <PasswordErrorMsg className={handleClassName('retypeEqual')}>
        {passwordErr.reEqual ? '✓ 새 비밀번호가 일치합니다.' : '× 새 비밀번호가 일치하지 않습니다.'}
      </PasswordErrorMsg>
      <UserInfoBnt type="button" onClick={handleEditBntClick}>
        비밀번호 변경
      </UserInfoBnt>
    </PasswordContainer>
  );
}

export default PasswordComponent;
