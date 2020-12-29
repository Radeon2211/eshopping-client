import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SC from './CartItemList.sc';
import CartItem from './CartItem/CartItem';
import { GreenText } from '../../../styled/components';

const CartItemList = (props) => {
  const { cart, isCartLoading } = props;

  const sellersObject = cart.reduce((acc, item) => {
    if (!acc[item.product.seller.username]) {
      acc[item.product.seller.username] = {
        items: [],
        sellerUsername: item.product.seller.username,
      };
    }
    acc[item.product.seller.username].items.push(item);
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
        <Link to={`/user/${sellerUsername}?p=1`}>
          <GreenText>{sellerUsername}</GreenText>
        </Link>
      </div>
      {items.map((item) => (
        <CartItem key={item._id} data={item} isCartLoading={isCartLoading} />
      ))}
    </SC.SingleSeller>
  ));

  return sellerList;
};

CartItemList.propTypes = {
  cart: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object)]).isRequired,
  isCartLoading: PropTypes.bool.isRequired,
};

export default CartItemList;
