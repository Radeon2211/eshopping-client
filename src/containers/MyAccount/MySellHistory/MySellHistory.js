import React from 'react';
import { useSelector } from 'react-redux';
import * as SC from '../MyAccount.sc';
import { orderTypes } from '../../../shared/constants';
import Orders from '../../../components/Orders/Orders';
import Heading from '../../../components/UI/Heading/Heading';

const MySellHistory = () => {
  const sellHistory = useSelector((state) => state.auth.sellHistory);

  return (
    <SC.OrdersWrapper>
      <Heading variant="h3" mgBottom="3">
        My sell history
      </Heading>
      <Orders orders={sellHistory} type={orderTypes.SELL_HISTORY} />
    </SC.OrdersWrapper>
  );
};

export default MySellHistory;
