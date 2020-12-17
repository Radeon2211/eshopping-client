import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import CartItem from './CartItem/CartItem';
import Button from '../../../components/UI/Button/Button';
import { GreenText } from '../../../styled/components';

const SC = {};
SC.Wrapper = styled.div`
  min-height: 14rem;

  & .clear-btn-box {
    text-align: center;
  }
`;
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
