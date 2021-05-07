import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MyIcon from '../../../UI/MyIcon';
import { ReactComponent as CartIcon } from '../../../../images/icons/cart.svg';

export const SC = {};
SC.Link = styled(Link)`
  position: relative;
`;
SC.Quantity = styled.div`
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.light1};
  display: flex;
  height: ${({ theme }) => theme.fontSizes.level5};
  font-size: ${({ theme }) => theme.fontSizes.level1};
  justify-content: center;
  position: absolute;
  top: -0.1rem;
  right: -0.1rem;
  width: ${({ theme }) => theme.fontSizes.level5};
  z-index: ${({ theme }) => theme.zIndexes.level1};
`;

const CartLink = () => {
  const cart = useSelector((state) => state.auth.cart);

  let quantity = null;
  if (cart && cart?.length > 0) {
    quantity = <SC.Quantity data-testid="CartLink-quantity">{cart.length}</SC.Quantity>;
  }

  return (
    <SC.Link to="/cart" data-testid="CartLink">
      {quantity}
      <MyIcon size="big">
        <CartIcon />
      </MyIcon>
    </SC.Link>
  );
};

export default CartLink;
