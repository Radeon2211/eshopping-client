import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TransactionItem from './TransactionItem/TransactionItem';
import CartItem from './CartItem/CartItem';
import { GreenText } from '../../styled/components';
import { CTItemTypes } from '../../shared/constants';

export const SC = {};
SC.SingleSeller = styled.div`
  padding: ${({ theme }) => theme.spacings.level3} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.light3};
  }

  &:last-child {
    padding-bottom: 0;
  }

  & .seller {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin-bottom: calc(0.5 * ${({ theme }) => theme.spacings.level2});
  }
`;

const CartAndTransactionItems = (props) => {
  const { items, type, isCartLoading } = props;

  const sellersObject = items.reduce((acc, item) => {
    const sellerUsername = type === CTItemTypes.CART ? item.product.seller.username : item.seller.username;
    if (!acc[sellerUsername]) {
      acc[sellerUsername] = {
        items: [],
        sellerUsername,
      };
    }
    acc[sellerUsername].items.push(item);
    return acc;
  }, {});

  const sellersArray = Object.entries(sellersObject).map(([sellerUsername, rest]) => ({
    sellerUsername,
    ...rest,
  }));

  const sellerList = sellersArray.map(({ sellerUsername, items }) => (
    <SC.SingleSeller key={sellerUsername}>
      <div className="seller">
        <span>seller </span>
        <Link to={`/user/${sellerUsername}?p=1`} data-test="user-link">
          <GreenText>{sellerUsername}</GreenText>
        </Link>
      </div>
      {type === CTItemTypes.CART ? (
        items.map((item) => (
          <CartItem key={item._id} data={item} isCartLoading={isCartLoading} />
        ))
      ) : (
        items.map((item) => (
          <TransactionItem key={item._id} data={item} />
        ))
      )}
    </SC.SingleSeller>
  ));

  return sellerList;
};

CartAndTransactionItems.defaultProps = {
  isCartLoading: undefined,
};

CartAndTransactionItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  isCartLoading: PropTypes.bool,
};

export default CartAndTransactionItems;
