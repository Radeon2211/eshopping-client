import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import * as SC from '../MyAccount.sc';
import { orderTypes } from '../../../shared/constants';
import Orders from '../../../components/Orders/Orders';
import Heading from '../../../components/UI/Heading/Heading';
import { scrollToTop } from '../../../shared/utility/utility';

const MyPlacedOrders = () => {
  const lastLocation = useLastLocation();

  const placedOrders = useSelector((state) => state.auth.placedOrders);

  useEffect(() => {
    if (!lastLocation?.pathname.startsWith('/order/')) {
      scrollToTop();
    }
  }, [lastLocation]);

  return (
    <SC.OrdersWrapper>
      <Heading variant="h3">My placed orders</Heading>
      <Orders orders={placedOrders} type={orderTypes.PLACED_ORDERS} />
    </SC.OrdersWrapper>
  );
};

export default MyPlacedOrders;
