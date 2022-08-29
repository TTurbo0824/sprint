import React, { useState } from 'react';
import styled from '@emotion/styled';

const AddressContainer = styled.div``;

function UserAddressPage() {
  const userAddress = {
    name: '테스트',
    address: '경기 성남시 분당구 탄청상로151번길 20 월드쇼핑 A동 4층',
    zipCode: '13636',
    mobile: '01012341234',
    deliveryGuide: '문 앞',
  };

  return (
    <AddressContainer>
      {userAddress.name}
      {userAddress.address}
    </AddressContainer>
  );
}

export default UserAddressPage;
