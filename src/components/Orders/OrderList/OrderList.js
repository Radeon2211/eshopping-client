import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import * as SC from './OrderList.sc';
import { GreenText, GrayText } from '../../../styled/components';
import TransactionAndOrderProdItem from '../../TransactionAndOrderProdItem/TransactionAndOrderProdItem';
import { orderTypes } from '../../../shared/constants';
import FlexWrapper from '../../UI/FlexWrapper';
import Button from '../../UI/Button/Button';
import LoadingOverlay from '../../UI/LoadingOverlay';
import { formatPrice } from '../../../shared/utility';

const OrderList = (props) => {
  const { orders, orderType } = props;

  const isDataLoading = useSelector((state) => state.ui.isDataLoading);

  const orderList = orders.map((order) => {
    const username =
      orderType === orderTypes.PLACED_ORDERS ? order.seller.username : order.buyer.username;
    const userType = orderType === orderTypes.PLACED_ORDERS ? 'seller ' : 'buyer ';
    return (
      <SC.SingleOrder key={order._id}>
        <FlexWrapper justify="space-between" align="flex-end">
          <div className="username">
            <span>{userType}</span>
            <Link to={`/user/${username}?p=1`} data-test="user-link">
              <GreenText>{username}</GreenText>
            </Link>
          </div>
          <span className="date">{moment(order.createdAt).format('D MMM YYYY, HH:mm')}</span>
        </FlexWrapper>
        {order.products.map((product) => (
          <TransactionAndOrderProdItem key={product._id} data={product} orderId={order._id} />
        ))}
        <FlexWrapper mgTop="level3" justify="space-between" align="center">
          <Link to={`/order/${order._id}`} data-test="details-link">
            <Button>details</Button>
          </Link>
          <div>
            <GrayText className="total-text">TOTAL</GrayText>
            <span className="price">{formatPrice(order.overallPrice)}</span>
          </div>
        </FlexWrapper>
      </SC.SingleOrder>
    );
  });

  const loadingOverlay = isDataLoading ? <LoadingOverlay /> : null;

  return (
    <SC.List>
      {orderList}
      {loadingOverlay}
    </SC.List>
  );
};

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  orderType: PropTypes.string.isRequired,
};

export default OrderList;
