import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SC from './Cart.sc';
import * as actions from '../../store/actions/indexActions';
import Heading from '../../components/UI/Heading/Heading';
import SideBySide from '../../components/UI/SideBySide';
import Panel from '../../components/UI/Panel';
import Button from '../../components/UI/Button/Button';
import CartItemList from './CartItemList/CartItemList';
import Loader from '../../components/UI/Loader';
import { DEFAULT_PATH } from '../../shared/constants';
import { GreenText } from '../../styled/components';
import { formatPrice } from '../../shared/utility';

const Cart = () => {
  const isCartLoading = useSelector((state) => state.ui.isCartLoading);
  const cart = useSelector((state) => state.auth.cart);

  const dispatch = useDispatch();
  const onFetchCart = useCallback(() => dispatch(actions.fetchCart()), [dispatch]);

  useEffect(() => {
    onFetchCart();
  }, [onFetchCart]);

  let content = <Loader />;
  if (cart === null) {
    content = (
      <Heading variant="h3" align="center">
        There is a problem to get your shopping cart
      </Heading>
    );
  } else if (cart) {
    if (cart.length > 0) {
      const cartValue = cart.reduce((acc, { product, quantity }) => {
        return acc + product.price * quantity;
      }, 0);
      const roundedCartValue = Math.round((cartValue + Number.EPSILON) * 100) / 100;

      content = (
        <>
          <Heading variant="h3">Your shopping cart</Heading>
          <SideBySide proportion="3/1" makeVerticalWhen={900}>
            <Panel>
              <CartItemList items={cart} />
            </Panel>
            <Panel>
              <SC.PayBox>
                <span className="to-pay-text">To pay</span>
                <span className="to-pay-value">{formatPrice(roundedCartValue)}</span>
              </SC.PayBox>
              <Button filled isLoading={isCartLoading} stretch>
                go to summary
              </Button>
            </Panel>
          </SideBySide>
        </>
      );
    } else {
      content = (
        <>
          <Heading variant="h3" mgBottom="level3" align="center" lineHeight="medium">
            Your shopping cart is empty. Check out the latest&nbsp;
            <Link to={DEFAULT_PATH}>
              <GreenText>offers</GreenText>
            </Link>
          </Heading>
          <Heading variant="h4" align="center">
            You can have up to 50 products in the cart
          </Heading>
        </>
      );
    }
  }

  return content;
};

export default Cart;
