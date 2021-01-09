import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import PlainPanel from '../UI/Panels/PlainPanel';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import BottomPagination from '../Pagination/BottomPagination/BottomPagination';
import OrderList from './OrderList/OrderList';
import SortOrders from './SortOrders/SortOrders';
import Heading from '../UI/Heading/Heading';
import Loader from '../UI/Loader';
import { listItemTypes, orderTypes, ORDERS_PER_PAGE } from '../../shared/constants';
import { TopPagination } from '../../styled/components';

export const SC = {};
SC.Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  width: 80rem;
`;

const Orders = (props) => {
  const { orders, type } = props;

  const history = useHistory();
  const {
    location: { search },
  } = history;

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
      <Heading variant="h4" align="center" data-test="info-heading">
        {type === orderTypes.PLACED_ORDERS
          ? 'There is a problem to fetch your placed orders'
          : 'There is a problem to fetch your sell history'}
      </Heading>
    );
  } else if (orders) {
    if (orders.length <= 0) {
      content = (
        <Heading variant="h4" align="center" data-test="info-heading">
          {type === orderTypes.PLACED_ORDERS
            ? `You don't have any placed orders yet`
            : 'Your sell history is empty'}
        </Heading>
      );
    } else if (orderCount > 0) {
      content = (
        <SC.Wrapper>
          <PlainPanel>
            <TopPagination>
              <SortOrders />
              <InputPagination itemQuantity={orderCount} quantityPerPage={ORDERS_PER_PAGE} />
            </TopPagination>
            <OrderList orders={orders} orderType={type} />
            <BottomPagination
              itemQuantity={orderCount}
              itemsType={listItemTypes.ORDER}
              quantityPerPage={ORDERS_PER_PAGE}
            />
          </PlainPanel>
        </SC.Wrapper>
      );
    }
  }

  return content;
};

Orders.propTypes = {
  orders: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object)]),
  type: PropTypes.string.isRequired,
};

export default Orders;
