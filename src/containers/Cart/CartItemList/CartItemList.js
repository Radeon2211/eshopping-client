import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import * as SC from './CartItemList.sc';
import CartItem from './CartItem/CartItem';
import Button from '../../../components/UI/Button/Button';
import { GreenText } from '../../../styled/components';

const CartItemList = (props) => {
  const { cart, isCartLoading } = props;

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

  const sellersObject = cart.reduce((acc, item) => {
    if (!acc[item.product.seller._id]) {
      acc[item.product.seller._id] = {
        items: [],
        sellerUsername: item.product.seller.username,
      };
    }
    acc[item.product.seller._id].items.push(item);
    return acc;
  }, {});

  const sellersArray = Object.entries(sellersObject).map(([sellerId, rest]) => ({
    sellerId,
    ...rest,
  }));

  const sellerList = sellersArray.map(({ sellerId, sellerUsername, items }) => (
    <SC.SingleSeller key={sellerId}>
      <div className="seller">
        <span>seller </span>
        <Link to={`/users/${sellerId}`}>
          <GreenText>{sellerUsername}</GreenText>
        </Link>
      </div>
      {items.map((item) => (
        <CartItem key={item._id} data={item} isCartLoading={isCartLoading} />
      ))}
    </SC.SingleSeller>
  ));

  return (
    <SC.Wrapper>
      <div className="clear-btn-box">
        <Button color="red" clicked={() => onSetModal(true, modalTypes.CLEAR_CART)}>
          clear the cart
        </Button>
      </div>
      {sellerList}
    </SC.Wrapper>
  );
};

CartItemList.propTypes = {
  cart: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object)]).isRequired,
  isCartLoading: PropTypes.bool.isRequired,
};

export default CartItemList;
