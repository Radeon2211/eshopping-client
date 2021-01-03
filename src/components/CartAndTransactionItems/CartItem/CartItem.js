import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import * as SC from './CartItem.sc';
import ChooseQuantity from '../../UI/ChooseQuantity';
import { updateCartActions } from '../../../shared/constants';
import { formatPrice } from '../../../shared/utility';
import { GrayText } from '../../../styled/components';
import MyIcon from '../../UI/MyIcon';
import { ReactComponent as TrashIcon } from '../../../images/SVG/trash.svg';
import theme from '../../../styled/theme';
import ProductThumbnail from '../../UI/ProductThumbnail';

const CartItem = (props) => {
  const { data, isCartLoading } = props;
  const {
    _id: itemId,
    quantity,
    product: { _id: productId, name, price, photo, quantity: productQuantity },
  } = data;

  const [inputValue, setInputValue] = useState(quantity);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const dispatch = useDispatch();
  const onUpdateCartItem = useCallback(
    (cartItemId, action, itemQuantity) =>
      dispatch(actions.updateCartItem(cartItemId, action, itemQuantity)),
    [dispatch],
  );
  const onRemoveCartItem = useCallback(
    (cartItemId) => dispatch(actions.removeCartItem(cartItemId)),
    [dispatch],
  );

  useEffect(() => {
    setInputValue((prevState) => {
      if (prevState !== quantity && !isCartLoading && !isInputFocused) return quantity;
      return prevState;
    });
  }, [quantity, inputValue, setInputValue, isInputFocused, isCartLoading]);

  const inputChangeHandle = (e) => {
    const value = +e.target.value || '';
    if (!value) {
      setInputValue(value);
    }
    if (value < 1 || value > productQuantity) return;
    setInputValue(value);
  };

  const inputBlurHandle = (e) => {
    const value = +e.target.value;
    if (!value || value < 1) {
      setInputValue(1);
      onUpdateCartItem(itemId, updateCartActions.NUMBER, 1);
    } else if (value > productQuantity) {
      setInputValue(productQuantity);
      onUpdateCartItem(itemId, updateCartActions.NUMBER, productQuantity);
    } else if (value !== quantity) {
      onUpdateCartItem(itemId, updateCartActions.NUMBER, value);
    }
    setIsInputFocused(false);
  };

  const inputIncrementHandle = () => {
    setInputValue((prevState) => {
      if (prevState < productQuantity) return prevState + 1;
      return prevState;
    });
    onUpdateCartItem(itemId, updateCartActions.INCREMENT);
  };

  const inputDecrementHandle = () => {
    setInputValue((prevState) => {
      if (prevState > 0) return prevState - 1;
      return prevState;
    });
    onUpdateCartItem(itemId, updateCartActions.DECREMENT);
  };

  return (
    <SC.Wrapper>
      <div className="photo-and-name">
        <Link to={`/products/${productId}`} data-test="product-link">
          <ProductThumbnail photo={photo} alt={name} productId={productId} width={7} height={7} />
        </Link>
        <span className="name">
          <Link to={`/products/${productId}`} data-test="product-link">
            {name}
          </Link>
        </span>
      </div>
      <div className="mobile-lower-row">
        <div className="choose-quantity-box">
          <ChooseQuantity
            maxQuantity={productQuantity}
            value={inputValue}
            incremented={inputIncrementHandle}
            decremented={inputDecrementHandle}
            name="quantity"
            changed={inputChangeHandle}
            blured={inputBlurHandle}
            focused={() => setIsInputFocused(true)}
          />
          <span className="quantity-number">{`of ${productQuantity}`}</span>
        </div>
        <div className="price-box">
          <span className="overall-price">{formatPrice(price * quantity)}</span>
          {quantity > 1 && (
            <GrayText className="price-per-piece">{`per piece ${formatPrice(price)}`}</GrayText>
          )}
        </div>
      </div>
      <MyIcon
        size="medium"
        color={theme.colors.red}
        onClick={() => onRemoveCartItem(itemId)}
        className="remove-icon"
      >
        <TrashIcon />
      </MyIcon>
    </SC.Wrapper>
  );
};

CartItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isCartLoading: PropTypes.bool.isRequired,
};

export default CartItem;