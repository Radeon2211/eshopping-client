import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as SC from './Cart.sc';
import * as actions from '../../store/actions/indexActions';
import Heading from '../../components/UI/Heading/Heading';
import SideBySide from '../../components/UI/SideBySide';
import PlainPanel from '../../components/UI/Panels/PlainPanel';
import StickyPanel from '../../components/UI/Panels/StickyPanel';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import LoadingOverlay from '../../components/UI/LoadingOverlay/LoadingOverlay';
import ToPayInfo from '../../components/UI/ToPayInfo/ToPayInfo';
import CartAndTransactionItems from '../../components/CartAndTransactionItems/CartAndTransactionItems';
import FlexWrapper from '../../components/UI/FlexWrapper';
import { itemTypes, defaultAppPath, modalTypes } from '../../shared/constants';
import { roundOverallPrice, scrollToTop } from '../../shared/utility/utility';
import { GreenText } from '../../styled/components';
import { ReactComponent as EmptyCart } from '../../images/empty-cart.svg';
import MetaDescriptor from '../../components/MetaDescriptor/MetaDescriptor';

const Cart = () => {
  const history = useHistory();

  const isCartLoading = useSelector((state) => state.ui.isCartLoading);
  const cart = useSelector((state) => state.auth.cart);

  const dispatch = useDispatch();
  const onFetchCart = useCallback(() => dispatch(actions.fetchCart()), [dispatch]);
  const onGoToTransaction = useCallback(
    (currentHistory) => dispatch(actions.goToTransaction(currentHistory)),
    [dispatch],
  );
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  useEffect(() => {
    onFetchCart();
    scrollToTop();
  }, [onFetchCart]);

  let content = <Loader align="center" />;
  if (cart === null) {
    content = (
      <Heading variant="h3" mgBottom="h3" align="center" lineHeight="4">
        There is a problem to get your shopping cart
      </Heading>
    );
  } else if (cart) {
    if (cart.length > 0) {
      const cartValue = cart.reduce((acc, { product, quantity }) => {
        return acc + product.price * quantity;
      }, 0);
      const roundedCartValue = roundOverallPrice(cartValue);

      content = (
        <>
          <Heading variant="h3">Your shopping cart</Heading>
          <SideBySide proportion="3/1" makeVerticalWhen={1200}>
            <PlainPanel>
              <FlexWrapper justify="center">
                <Button color="red" clicked={() => onSetModal(modalTypes.CLEAR_CART)}>
                  clear the cart
                </Button>
              </FlexWrapper>
              <CartAndTransactionItems
                items={cart}
                type={itemTypes.CART}
                isCartLoading={isCartLoading}
              />
            </PlainPanel>
            <StickyPanel>
              <FlexWrapper direction="column" spacing="2">
                <ToPayInfo value={roundedCartValue} />
                <Button
                  filled
                  stretch
                  disabled={isCartLoading}
                  clicked={() => onGoToTransaction(history)}
                >
                  go to summary
                </Button>
              </FlexWrapper>
              {isCartLoading && <LoadingOverlay />}
            </StickyPanel>
          </SideBySide>
        </>
      );
    } else {
      content = (
        <SC.EmptyCart data-testid="Cart-empty-cart">
          <Heading variant="h3" mgBottom="3" align="center" lineHeight="4">
            Your shopping cart is empty. Check out the&nbsp;
            <Link to={defaultAppPath} data-testid="Cart-default-path-link">
              <GreenText>latest offers</GreenText>
            </Link>
          </Heading>
          <Heading variant="h4" align="center" lineHeight="4" mgBottom="3">
            You can have up to 50 products in the cart
          </Heading>
          <EmptyCart className="empty-cart-image" />
        </SC.EmptyCart>
      );
    }
  }

  return (
    <>
      <MetaDescriptor title="Your cart - E-Shopping" description="Check out content of your cart" />
      {content}
    </>
  );
};

export default Cart;
