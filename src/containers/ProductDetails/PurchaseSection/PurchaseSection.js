import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as SC from './PurchaseSection.sc';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import Button from '../../../components/UI/Button/Button';
import ChooseQuantity from '../../../components/UI/ChooseQuantity';
import PlainText from '../../../components/UI/PlainText';
import { GreenText } from '../../../styled/components';
import Heading from '../../../components/UI/Heading/Heading';
import theme from '../../../styled/theme';
import FlexWrapper from '../../../components/UI/FlexWrapper';

const PurchaseSection = (props) => {
  const { productId, productQuantity, productSellerUsername, onSetModal, userProfile } = props;

  const history = useHistory();

  const [chosenQuantity, setChosenQuantity] = useState(1);

  const cart = useSelector((state) => state.auth.cart);
  const isCartLoading = useSelector((state) => state.ui.isCartLoading);

  const dispatch = useDispatch();
  const onAddCartItem = useCallback((item) => dispatch(actions.addCartItem(item)), [dispatch]);
  const onGoToTransaction = useCallback(
    (currentHistory, item) => dispatch(actions.goToTransaction(currentHistory, item)),
    [dispatch],
  );

  const inputChangeHandle = (e) => {
    const value = +e.target.value || '';
    if (!value) {
      setChosenQuantity(value);
      return;
    }
    if (value < 1 || value > productQuantity) return;
    setChosenQuantity(value);
  };

  const inputBlurHandle = (e) => {
    const value = +e.target.value;
    if (!value || value < 1) {
      setChosenQuantity(1);
    } else if (value > productQuantity) {
      setChosenQuantity(productQuantity);
    } else {
      setChosenQuantity(value);
    }
  };

  const incrementQuantityHandle = () => {
    if (chosenQuantity < productQuantity) {
      setChosenQuantity((prevState) => prevState + 1);
    }
  };

  const decrementQuantityHandle = () => {
    if (chosenQuantity > 1) {
      setChosenQuantity((prevState) => prevState - 1);
    }
  };

  const addToCartClickHandle = () => {
    if (!userProfile) {
      onSetModal(true, modalTypes.LOGIN);
    } else if (userProfile?.status !== 'active') {
      onSetModal(true, modalTypes.PENDING_USER_INFO);
    } else {
      onAddCartItem({
        quantity: chosenQuantity,
        product: productId,
      });
    }
  };

  const buyNowClickHandle = () => {
    if (!userProfile) {
      onSetModal(true, modalTypes.LOGIN);
    } else if (userProfile?.status !== 'active') {
      onSetModal(true, modalTypes.PENDING_USER_INFO);
    } else {
      onGoToTransaction(history, {
        product: productId,
        quantity: chosenQuantity,
      });
    }
  };

  let purchaseSection = (
    <>
      <PlainText size="2">{`Quantity: ${productQuantity}`}</PlainText>
      <Heading variant="h4" mgTop="3" data-test="info-to-seller">
        You are the seller of this product
      </Heading>
    </>
  );

  if (userProfile?.username !== productSellerUsername) {
    let givenProductInCart = null;
    if (cart) {
      givenProductInCart = cart.find((item) => item.product._id === productId);
    }
    let addToCartBtn = (
      <Button filled stretch clicked={addToCartClickHandle} isLoading={isCartLoading}>
        Add to cart
      </Button>
    );
    if (givenProductInCart?.quantity >= productQuantity) {
      addToCartBtn = (
        <Heading variant="h4" align="center" mgBottom="2" data-test="not-able-to-add">
          You have added all pieces to&nbsp;
          <Link to="/cart">
            <GreenText>cart</GreenText>
          </Link>
        </Heading>
      );
    }

    purchaseSection = (
      <>
        <FlexWrapper align="center" mgBottom="3" data-test="choose-quantity-wrapper">
          <ChooseQuantity
            name="quantity"
            maxQuantity={productQuantity}
            value={chosenQuantity}
            incremented={incrementQuantityHandle}
            decremented={decrementQuantityHandle}
            changed={inputChangeHandle}
            blured={inputBlurHandle}
          />
          <PlainText size="2" mgLeft="1" data-test="quantity">
            {`of ${productQuantity} piece${productQuantity > 1 ? 's' : ''}`}
            {givenProductInCart && (
              <PlainText color={theme.colors.light4}>
                {` (${givenProductInCart.quantity} in cart)`}
              </PlainText>
            )}
          </PlainText>
        </FlexWrapper>
        {addToCartBtn}
        <Button filled stretch clicked={buyNowClickHandle} isLoading={isCartLoading}>
          buy now
        </Button>
      </>
    );
  }

  return <SC.Wrapper>{purchaseSection}</SC.Wrapper>;
};

PurchaseSection.defaultProps = {
  productSellerUsername: undefined,
  userProfile: null,
};

PurchaseSection.propTypes = {
  productId: PropTypes.string.isRequired,
  productQuantity: PropTypes.number.isRequired,
  productSellerUsername: PropTypes.string,
  onSetModal: PropTypes.func.isRequired,
  userProfile: PropTypes.oneOfType([PropTypes.object]),
};

export default PurchaseSection;
