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
    margin-bottom: ${({ theme }) => theme.spacings.level3};
    text-align: center;
  }
`;
SC.SingleSeller = styled.div`
  & .seller {
    font-size: ${({ theme }) => theme.fontSizes.level3};
  }
`;

const CartItemList = (props) => {
  const { items } = props;

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );
  const sellersObject = items.reduce((acc, item) => {
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

  const sellerList = sellersArray.map(({ sellerId, sellerUsername, products }) => (
    <SC.SingleSeller key={sellerId}>
      <div className="seller">
        <span>seller </span>
        <Link to={`/users/${sellerId}`}>
          <GreenText>{sellerUsername}</GreenText>
        </Link>
      </div>
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
  items: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object)]).isRequired,
};

export default CartItemList;
