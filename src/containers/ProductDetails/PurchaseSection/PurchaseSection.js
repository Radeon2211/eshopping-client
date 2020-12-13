import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SC from './PurchaseSection.sc';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import Button from '../../../components/UI/Button/Button';
import ChooseQuantity from '../../../components/UI/ChooseQuantity';
import { GreenText } from '../../../styled/components';

const PurchaseSection = (props) => {
  const { productId, productQuantity, productSellerId, onSetModal, userProfile } = props;

  const [chosenQuantity, setChosenQuantity] = useState(1);

  const cart = useSelector((state) => state.auth.cart);
  const isCartLoading = useSelector((state) => state.ui.isCartLoading);

  const dispatch = useDispatch();
  const onAddCartItem = useCallback((item) => dispatch(actions.addCartItem(item)), [dispatch]);

  const inputChangeHandle = (e) => {
    const value = +e.target.value || '';
    if (!value) {
      setChosenQuantity(value);
    }
    if (value < 1 || value > productQuantity) return;
    setChosenQuantity(value);
  };

  const inputValidateHandle = (e) => {
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
    }
  };

  let purchaseSection = (
    <SC.InfoToSeller>
      <div className="info-quantity-box">
        <span className="quantity-text gray-text">Quantity: </span>
        <span className="quantity-number">{productQuantity}</span>
      </div>
      <span className="text">You are the seller of this product</span>
    </SC.InfoToSeller>
  );

  if (userProfile?._id !== productSellerId) {
    const givenProductInCart = cart.find((item) => item.product._id === productId);
    let addToCartBtn = (
      <Button filled clicked={addToCartClickHandle} loading={isCartLoading ? 1 : 0}>
        Add to cart
      </Button>
    );
    if (givenProductInCart?.quantity >= productQuantity) {
      console.log('eeeeeeeeeeeee');
      addToCartBtn = (
        <span className="not-able-to-add">
          You have all pieces added to&nbsp;
          <Link to="/cart">
            <GreenText>cart</GreenText>
          </Link>
        </span>
      );
    }

    purchaseSection = (
      <>
        <div className="choose-quantity-box">
          <ChooseQuantity
            name="quantity"
            maxQuantity={productQuantity}
            value={chosenQuantity}
            incremented={incrementQuantityHandle}
            decremented={decrementQuantityHandle}
            changed={inputChangeHandle}
            blured={inputValidateHandle}
          />
          <span className="quantity-number">
            {`of ${productQuantity} piece${productQuantity > 1 ? 's' : ''}`}
            {givenProductInCart ? ` (${givenProductInCart?.quantity} in cart)` : ''}
          </span>
        </div>
        {addToCartBtn}
        <Button filled clicked={buyNowClickHandle}>
          buy now
        </Button>
      </>
    );
  }

  return <SC.Wrapper>{purchaseSection}</SC.Wrapper>;
};

PurchaseSection.defaultProps = {
  productSellerId: undefined,
  userProfile: null,
};

PurchaseSection.propTypes = {
  productId: PropTypes.string.isRequired,
  productQuantity: PropTypes.number.isRequired,
  productSellerId: PropTypes.string,
  onSetModal: PropTypes.func.isRequired,
  userProfile: PropTypes.oneOfType([PropTypes.object]),
};

export default PurchaseSection;
