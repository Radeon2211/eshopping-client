import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SC from './PurchaseSection.sc';
import { modalTypes } from '../../../shared/constants';
import Button from '../../../components/UI/Button/Button';
import ChooseQuantity from '../../../components/UI/ChooseQuantity';

const PurchaseSection = (props) => {
  const { productQuantity, productSellerId, onSetModal, userProfile } = props;

  const [chosenQuantity, setChosenQuantity] = useState(1);

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
    }
  };

  const buyNowClickHandle = () => {
    if (!userProfile) {
      onSetModal(true, modalTypes.LOGIN);
    }
  };

  let purchaseSection = <span className="not-able-to-buy">You are the seller of this product</span>;
  if (userProfile?._id !== productSellerId) {
    const quantityNumberText = `of ${productQuantity} piece${productQuantity > 1 ? 's' : ''}`;
    purchaseSection = (
      <>
        <div className="quantity-box">
          <ChooseQuantity
            name="quantity"
            maxQuantity={productQuantity}
            value={chosenQuantity}
            incremented={incrementQuantityHandle}
            decremented={decrementQuantityHandle}
            changed={inputChangeHandle}
            blured={inputValidateHandle}
          />
          <span className="quantity-number">{quantityNumberText}</span>
        </div>
        <Button filled clicked={addToCartClickHandle}>
          Add to cart
        </Button>
        <Button filled clicked={buyNowClickHandle}>
          Buy now
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
  productQuantity: PropTypes.number.isRequired,
  productSellerId: PropTypes.string,
  onSetModal: PropTypes.func.isRequired,
  userProfile: PropTypes.oneOfType([PropTypes.object]),
};

export default PurchaseSection;
