import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MyIcon from '../../../UI/MyIcon';
import { ReactComponent as CartIcon } from '../../../../images/SVG/cart.svg';

export const SC = {};
SC.Link = styled(Link)`
  position: relative;
`;
SC.Quantity = styled.div`
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.light1};
  font-size: ${({ theme }) => theme.fontSizes.level1};
  position: absolute;
  padding: calc(0.25 * ${({ theme }) => theme.spacings.level1})
    calc(0.75 * ${({ theme }) => theme.spacings.level1});
  top: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndexes.level1};
`;

const CartLink = () => {
  const cart = useSelector((state) => state.auth.cart);

  let quantity = null;
  if (cart && cart?.length > 0) {
    quantity = <SC.Quantity>{cart.length}</SC.Quantity>;
  }

  return (
    <SC.Link to="/cart">
      {quantity}
      <MyIcon size="big">
        <CartIcon />
      </MyIcon>
    </SC.Link>
  );
};

export default CartLink;
