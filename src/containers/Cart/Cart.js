import React, { useEffect, useCallback, useRef } from 'react';
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
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import { DEFAULT_PATH, modalTypes } from '../../shared/constants';
import { GreenText, AlignCenter } from '../../styled/components';
import { formatPrice } from '../../shared/utility';
import { ReactComponent as EmptyCart } from '../../images/empty-cart.svg';

const Cart = () => {
  const summaryRef = useRef(null);

  const isCartLoading = useSelector((state) => state.ui.isCartLoading);
  const cart = useSelector((state) => state.auth.cart);

  const dispatch = useDispatch();
  const onFetchCart = useCallback(() => dispatch(actions.fetchCart()), [dispatch]);
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

  useEffect(() => {
    if (summaryRef.current) {
      const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle('is-sticky', e.intersectionRatio < 1),
        { threshold: [1] },
      );
      observer.observe(summaryRef.current);
    }
    onFetchCart();
  }, [onFetchCart]);

  let content = <Loader align="center" />;
  if (cart === null) {
    content = (
      <Heading variant="h3" align="center" data-test="cart-error-heading">
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
          <SideBySide proportion="3/1" makeVerticalWhen={1200}>
            <Panel>
              <AlignCenter>
                <Button color="red" clicked={() => onSetModal(true, modalTypes.CLEAR_CART)}>
                  clear the cart
                </Button>
              </AlignCenter>
              <CartItemList cart={cart} isCartLoading={isCartLoading} />
            </Panel>
            <SC.Summary ref={summaryRef}>
              <Panel>
                <SC.PayBox>
                  <span className="to-pay-text">To pay</span>
                  <span className="to-pay-value">{formatPrice(roundedCartValue)}</span>
                </SC.PayBox>
                <Button filled stretch disabled={isCartLoading}>
                  go to summary
                </Button>
                {isCartLoading && <LoadingOverlay />}
              </Panel>
            </SC.Summary>
          </SideBySide>
        </>
      );
    } else {
      content = (
        <SC.EmptyCart>
          <Heading
            variant="h3"
            mgBottom="level3"
            align="center"
            lineHeight="medium"
            data-test="cart-empty-heading"
          >
            Your shopping cart is empty. Check out the latest&nbsp;
            <Link to={DEFAULT_PATH}>
              <GreenText>offers</GreenText>
            </Link>
          </Heading>
          <Heading variant="h4" align="center" data-test="cart-info-heading" mgBottom="level3">
            You can have up to 50 products in the cart
          </Heading>
          <EmptyCart className="empty-cart-image" />
        </SC.EmptyCart>
      );
    }
  }

  return content;
};

export default Cart;
