import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SC from './OrderList.sc';
import theme from '../../../styled/theme';
import { GreenText } from '../../../styled/components';
import TransactionAndOrderProdItem from '../../TransactionAndOrderProdItem/TransactionAndOrderProdItem';
import { orderTypes } from '../../../shared/constants';
import PlainText from '../../UI/PlainText';
import FlexWrapper from '../../UI/FlexWrapper';
import Button from '../../UI/Button/Button';
import LoadingOverlay from '../../UI/LoadingOverlay';
import { formatPrice, formatOrderDate } from '../../../shared/utility';

const OrderList = (props) => {
  const { orders, orderType } = props;

  const isDataLoading = useSelector((state) => state.ui.isDataLoading);

  const orderList = orders.map((order) => {
    const username =
      orderType === orderTypes.PLACED_ORDERS ? order.seller?.username : order.buyer?.username;
    const userType = orderType === orderTypes.PLACED_ORDERS ? 'seller ' : 'buyer ';

    return (
      <SC.SingleOrder key={order._id}>
        <FlexWrapper justify="space-between" align="flex-end" spacing="3">
          <PlainText size="3">
            <span>{userType}</span>
            {username ? (
              <Link to={`/user/${username}?p=1`} data-testid="OrderList-user-link">
                <GreenText>{username}</GreenText>
              </Link>
            ) : (
              <PlainText fStyle="italic" data-testid="OrderList-account-deleted">
                (account has been deleted)
              </PlainText>
            )}
          </PlainText>
          <PlainText size="2">{formatOrderDate(order.createdAt)}</PlainText>
        </FlexWrapper>
        {order.products.map((product) => (
          <TransactionAndOrderProdItem key={product._id} data={product} orderId={order._id} />
        ))}
        <FlexWrapper mgTop="3" justify="space-between" align="center" spacing="3">
          <Link to={`/order/${order._id}`} data-testid="OrderList-order-details-link">
            <Button>details</Button>
          </Link>
          <div>
            <PlainText size="3" mgRight="1" spacing="1px" color={theme.colors.light4}>
              TOTAL
            </PlainText>
            <PlainText size="5">{formatPrice(order.overallPrice)}</PlainText>
          </div>
        </FlexWrapper>
      </SC.SingleOrder>
    );
  });

  const loadingOverlay = isDataLoading ? <LoadingOverlay /> : null;

  return (
    <SC.Wrapper>
      {orderList}
      {loadingOverlay}
    </SC.Wrapper>
  );
};

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  orderType: PropTypes.string.isRequired,
};

export default OrderList;
