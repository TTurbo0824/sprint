import React, { useState } from 'react';
import styled from '@emotion/styled';

const SettingWrapper = styled.div`
  width: 100%;
  height: 95%;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div``;

const CloseBnt = styled.button`
  font-size: 2rem;
  width: 2rem;
  background-color: white;
  border: none;
  padding: 0;
`;

const OptionContainer = styled.div`
  margin-bottom: 1rem;
  padding: 0.75rem;
`;

const SearchInput = styled.input`
  width: 100%;
`;

const Field = styled.div`
  width: 100%;
  margin-bottom: 0.25rem;
`;

const OptionBnt = styled.button`
  background-color: white;
  border: 1px solid gray;
  border-radius: 15px;
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

type SettingProp = {
  handleOpenSetting: () => void;
};

function OrderSetting({ handleOpenSetting }: SettingProp) {
  const [url, setUrl] = useState<{ [key: string]: string }>({
    startDate: '',
    endDate: '',
    searchKeyword: '',
    orderType: '',
    orderStatus: '',
  });

  const { startDate, endDate, searchKeyword, orderType, orderStatus } = url;
  const requestUrl = `/api/order/startDate=${startDate}&endDate=${endDate}&orderType=${orderType}&orderStatus=${orderStatus}&searchKeyword=${searchKeyword}`;
  const setting: { [key: string]: Array<string> } = {
    조회기간: ['3개월', '6개월', '9개월', '12개월'],
    '상품&배송유형': ['배송/방문수령', '배달/픽업', '예약'],
    배송상태: ['결제완료', '상품준비중', '배송중', '배송완료', '주문취소'],
  };

  const tempSetting: { [key: string]: string } = {
    startDate,
    endDate,
    searchKeyword,
    orderType,
    orderStatus,
  };

  const handleUrl = (type: string, value: string) => {
    let tempKey = '';
    if (type === '상품&배송유형') tempKey = 'orderType';
    else if (type === '조회기간') tempKey = 'endDate';
    else if (type === '배송상태') tempKey = 'orderStatus';
    tempSetting[tempKey] = value;
    setUrl(tempSetting);
  };

  console.log('✨👀✨👀✨👀✨👀');
  console.log(requestUrl);

  return (
    <SettingWrapper>
      <TopContainer>
        <div style={{ width: '2rem' }} />
        <Title>상세조회</Title>
        <CloseBnt onClick={handleOpenSetting}>×</CloseBnt>
      </TopContainer>
      <OptionContainer>
        <SearchInput placeholder="상품명 혹은 상점명으로 검색" />
      </OptionContainer>
      {Object.keys(setting).map((el) => (
        <OptionContainer key={el}>
          <Field>{el}</Field>
          {setting[el].map((item) => (
            <OptionBnt key={item} onClick={() => handleUrl(el, item)}>
              {item}
            </OptionBnt>
          ))}
        </OptionContainer>
      ))}
      <BottomContainer>
        {' '}
        <button type="button">조회</button>
        <button type="button">초기화</button>
      </BottomContainer>
    </SettingWrapper>
  );
}

export default OrderSetting;
