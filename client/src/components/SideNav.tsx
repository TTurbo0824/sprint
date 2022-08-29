import React from 'react';
import styled from '@emotion/styled';

const SideNavWrapper = styled.div`
  padding-left: 1rem;
  ul {
    padding: 0;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;

const Menu = styled.li`
  cursor: pointer;
  list-style: none;
  width: 80%;
  text-align: left;
  padding: 0.5rem 0.25rem;
`;

function SideNav() {
  const navObj: { [key: string]: string } = {
    userInfo: '회원 정보',
    address: '배송지 관리',
    order: '주문 관리',
    review: '리뷰 관리',
    inquiry: '문의 관리',
  };

  const navMenu = Object.keys(navObj);

  return (
    <SideNavWrapper>
      <ul>
        {navMenu.map((menu) => (
          <Menu key={menu} onClick={() => window.location.replace(`/${menu}`)}>
            {navObj[menu]}
          </Menu>
        ))}
      </ul>
    </SideNavWrapper>
  );
}

export default SideNav;
