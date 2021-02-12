import React from 'react';
import { useSelector } from 'react-redux';
import * as SC from '../MyAccount.sc';
import { orderTypes } from '../../../shared/constants';
import Orders from '../../../components/Orders/Orders';
import Heading from '../../../components/UI/Heading/Heading';

const MyPlacedOrders = () => {
  const placedOrders = useSelector((state) => state.auth.placedOrders);

  return (
    <SC.OrdersWrapper>
      <Heading variant="h3" mgBottom="3">
        My placed orders
      </Heading>
      <Orders orders={placedOrders} type={orderTypes.PLACED_ORDERS} />
    </SC.OrdersWrapper>
  );
};

export default MyPlacedOrders;
