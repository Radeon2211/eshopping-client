import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import PlainPanel from '../UI/Panels/PlainPanel';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import BottomPagination from '../Pagination/BottomPagination/BottomPagination';
import OrderList from './OrderList/OrderList';
import SortOrders from './SortOrders/SortOrders';
import Heading from '../UI/Heading/Heading';
import Loader from '../UI/Loader/Loader';
import { listItemTypes, defaultOrdersPerPage } from '../../shared/constants';
import * as propTypes from '../../shared/propTypes';
import { TopPagination } from '../../styled/components';
import { OrderType } from '../../shared/types/types';

export default function Orders({ orders, type }) {
  const { search } = useLocation();

  const orderCount = useSelector((state) => state.auth.orderCount);

  const dispatch = useDispatch();
  const onFetchOrders = useCallback(
    (queryParams, orderType) => dispatch(actions.fetchOrders(queryParams, orderType)),
    [dispatch],
  );

  useEffect(() => {
    onFetchOrders(search, type);
  }, [onFetchOrders, type, search]);

  let content = <Loader align="center" />;
  if (orders === null) {
    content = (
      <Heading $variant="h4" $align="center" data-testid="Orders-error">
        {type === OrderType.PLACED_ORDERS
          ? 'There is a problem to fetch your placed orders'
          : 'There is a problem to fetch your sell history'}
      </Heading>
    );
  } else if (orders) {
    if (orders.length <= 0) {
      content = (
        <Heading $variant="h4" $align="center" data-testid="Orders-no-orders-info">
          {type === OrderType.PLACED_ORDERS
            ? `You don't have any placed orders yet`
            : 'Your sell history is empty'}
        </Heading>
      );
    } else if (orderCount > 0) {
      content = (
        <PlainPanel>
          <TopPagination>
            <SortOrders />
            <InputPagination itemQuantity={orderCount} quantityPerPage={defaultOrdersPerPage} />
          </TopPagination>
          <OrderList orders={orders} orderType={type} />
          <BottomPagination
            itemQuantity={orderCount}
            itemsType={listItemTypes.ORDER}
            quantityPerPage={defaultOrdersPerPage}
          />
        </PlainPanel>
      );
    }
  }

  return content;
}

Orders.defaultProps = {
  orders: undefined,
};

Orders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape(propTypes.orderItem)),
  type: PropTypes.string.isRequired,
};
