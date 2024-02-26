import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as SC from '../MyAccount.sc';
import { orderTypes } from '../../../shared/constants';
import Orders from '../../../components/Orders/Orders';
import Heading from '../../../components/UI/Heading/Heading';
import { scrollToTop } from '../../../shared/utility/utility';
import MetaDescriptor from '../../../components/MetaDescriptor/MetaDescriptor';
import useLastLocation from '../../../shared/useLastLocation';

export default function MySellHistory() {
  const lastLocation = useLastLocation();

  const sellHistory = useSelector((state) => state.auth.sellHistory);

  useEffect(() => {
    if (!lastLocation?.pathname.startsWith('/order/')) {
      scrollToTop();
    }
  }, [lastLocation]);

  return (
    <SC.OrdersWrapper>
      <MetaDescriptor
        title="Your sell history - E-Shopping"
        description="Check out your sell history"
      />
      <Heading $variant="h3">My sell history</Heading>
      <Orders orders={sellHistory} type={orderTypes.SELL_HISTORY} />
    </SC.OrdersWrapper>
  );
}
