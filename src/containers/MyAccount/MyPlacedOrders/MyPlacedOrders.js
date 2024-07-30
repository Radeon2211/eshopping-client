import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as SC from '../MyAccount.sc';
import Orders from '../../../components/Orders/Orders';
import Heading from '../../../components/UI/Heading/Heading';
import { scrollToTop } from '../../../shared/utility/utility';
import MetaDescriptor from '../../../components/MetaDescriptor/MetaDescriptor';
import useLastLocation from '../../../shared/hooks/useLastLocation';
import { OrderType } from '../../../shared/types/types';

export default function MyPlacedOrders() {
  const lastLocation = useLastLocation();

  const placedOrders = useSelector((state) => state.auth.placedOrders);

  useEffect(() => {
    if (!lastLocation?.pathname.startsWith('/order/')) {
      scrollToTop();
    }
  }, [lastLocation]);

  return (
    <SC.OrdersWrapper>
      <MetaDescriptor
        title="Your placed orders - E-Shopping"
        description="Check out orders that you placed"
      />
      <Heading $variant="h3">My placed orders</Heading>
      <Orders orders={placedOrders} type={OrderType.PLACED_ORDERS} />
    </SC.OrdersWrapper>
  );
}
