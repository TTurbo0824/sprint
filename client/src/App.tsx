import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled'
import UserInfoPage from './pages/mypage/userInfo/UserInfoPage';
import UserAddressPage from './pages/mypage/userInfo/UserAddressPage';
import OrderPage from './pages/mypage/order/OrderPage';
import ReviewPage from './pages/mypage/review/ReviewPage';
import InquiryPage from './pages/mypage/inquiry/InquiryPage';
import SideNav from './components/SideNav';

const AppWrapper = styled.div`
  button {
    cursor: pointer;
  }
`;

function App() {
  return (
    <AppWrapper>
      <SideNav />
      <BrowserRouter>
        <Routes>
          <Route path="/userInfo" element={<UserInfoPage />} />
          <Route path="/address" element={<UserAddressPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
