import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import * as SC from './CartItem.sc';
import ChooseQuantity from '../../UI/ChooseQuantity/ChooseQuantity';
import { formatPrice } from '../../../shared/utility/utility';
import MyIcon from '../../UI/MyIcon';
import PlainText from '../../UI/PlainText';
import { ReactComponent as TrashIcon } from '../../../images/icons/trash.svg';
import theme from '../../../styled/theme';
import ProductThumbnail from '../../UI/ProductThumbnail/ProductThumbnail';
import * as propTypes from '../../../shared/propTypes';
import { UpdateCartAction } from '../../../shared/types/types';

export default function CartItem({ data, isCartLoading }) {
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
      onUpdateCartItem(itemId, UpdateCartAction.NUMBER, 1);
    } else if (value > productQuantity) {
      setInputValue(productQuantity);
      onUpdateCartItem(itemId, UpdateCartAction.NUMBER, productQuantity);
    } else if (value !== quantity) {
      onUpdateCartItem(itemId, UpdateCartAction.NUMBER, value);
    }
    setIsInputFocused(false);
  };

  const inputIncrementHandle = () => {
    setInputValue((prevState) => {
      if (prevState < productQuantity) return prevState + 1;
      return prevState;
    });
    onUpdateCartItem(itemId, UpdateCartAction.INCREMENT);
  };

  const inputDecrementHandle = () => {
    setInputValue((prevState) => {
      if (prevState > 0) return prevState - 1;
      return prevState;
    });
    onUpdateCartItem(itemId, UpdateCartAction.DECREMENT);
  };

  return (
    <SC.Wrapper data-testid="CartItem">
      <div className="photo-and-name">
        <Link to={`/product/${productId}`} data-testid="CartItem-product-link-photo">
          <ProductThumbnail isPhoto={photo} alt={name} productId={productId} width="7" height="7" />
        </Link>
        <span className="name">
          <Link to={`/product/${productId}`} data-testid="CartItem-product-link-name">
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
          <PlainText $size="level2" $mgLeft="level1" data-testid="CartItem-available-quantity">
            {`of ${productQuantity}`}
          </PlainText>
        </div>
        <div className="price-box">
          <PlainText $size="level5" data-testid="CartItem-total-price">
            {formatPrice(price * quantity)}
          </PlainText>
          {quantity > 1 && (
            <PlainText $size="level2" $textAlign="right" data-testid="CartItem-price-per-piece">
              {`per piece ${formatPrice(price)}`}
            </PlainText>
          )}
        </div>
      </div>
      <MyIcon
        $size="medium"
        $color={theme.colors.red}
        onClick={() => onRemoveCartItem(itemId)}
        className="remove-icon"
        data-testid="CartItem-trash-icon"
      >
        <TrashIcon />
      </MyIcon>
    </SC.Wrapper>
  );
}

CartItem.propTypes = {
  data: PropTypes.shape(propTypes.cartItem).isRequired,
  isCartLoading: PropTypes.bool.isRequired,
};
