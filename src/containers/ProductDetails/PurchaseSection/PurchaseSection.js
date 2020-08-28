import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SC from './PurchaseSection.sc';
import Button from '../../../components/UI/Button/Button';
import ChooseQuantity from '../../../components/UI/ChooseQuantity/ChooseQuantity';

const PurchaseSection = (props) => {
  const { productQuantity } = props;

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

  const quantityNumberText = `of ${productQuantity} piece${productQuantity > 1 ? 's' : ''}`;

  return (
    <SC.Wrapper>
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
      <Button filled>Add to cart</Button>
      <Button filled>Buy now</Button>
    </SC.Wrapper>
  );
};

PurchaseSection.propTypes = {
  productQuantity: PropTypes.number.isRequired,
};

export default PurchaseSection;
