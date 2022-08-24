import React, { useState } from 'react';
import styled from '@emotion/styled'
import { orderList } from '../../../database/orderList';

const OrderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
`;

const FieldContainer = styled.div`
  width: 100%;
`;

const Field = styled.button``;

const OrderContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
  margin-bottom: 1rem;
  padding: 0.75rem;
`;

const ItemContainer = styled.div`
  border: 1px solid gray;
  margin-bottom: 1rem;
  padding: 0.75rem;
`;

function OrderPage() {
  const allOrders = orderList;
  const [displayOrder, setDisplayOrder] = useState(allOrders);

  const fields = ['전체', '배송/방문수령', '배달/픽업', '예약'];

  const handleType = (type: string) => {
    if (type === '전체') setDisplayOrder(allOrders);
    else setDisplayOrder(allOrders.filter((order) => order.type === type));
  };

  return (
    <OrderWrapper>
      Order page
      <FieldContainer>
        {fields.map((field) => (
          <Field key={field} onClick={() => handleType(field)}>
            {field}
          </Field>
        ))}
      </FieldContainer>
      {displayOrder.map((order) => (
        <OrderContainer key={order.id}>
          <span>{order.orderStatus}</span>
          <span>{order.orderDate}</span>
          {order.orderItems.map((item) => (
            <ItemContainer key={item.itemId}>
              <div>{item.shopName}</div>
              <div>{item.itemName}</div>
              {item.option.map((option, idx) => (
                <div key={option}>
                  {`옵션${item.option.length > 1 ? idx + 1 : ''}`}
                  <span>{option}</span>
                </div>
              ))}
              <div>{item.price}원</div>
              <div>{item.quantity}개</div>
              {!item.isReviewed ? <button type="button">리뷰 작성하기</button> : null}
            </ItemContainer>
          ))}
        </OrderContainer>
      ))}
    </OrderWrapper>
  );
}

export default OrderPage;
