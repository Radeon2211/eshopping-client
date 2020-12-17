import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SC from './CartItemAdded.sc';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';
import Heading from '../../UI/Heading/Heading';
import HorizontalWrapper from '../../UI/HorizontalWrapper';
import Loader from '../../UI/Loader';
import noPhoto from '../../../images/no-photo.png';
import { baseURL } from '../../../axios';
import { formatPrice } from '../../../shared/utility';

const CartItemAdded = () => {
  const productDetails = useSelector((state) => state.product.productDetails);
  const cart = useSelector((state) => state.auth.cart);
  const isCartLoading = useSelector((state) => state.ui.isCartLoading);

  const dispatch = useDispatch();
  const onSetModal = useCallback((isModalOpen) => dispatch(actions.setModal(isModalOpen)), [
    dispatch,
  ]);

  const addedProductInCart = cart.find((item) => item.product._id === productDetails?._id);

  let content = <Loader />;
  if (!isCartLoading && addedProductInCart) {
    const {
      quantity,
      product: { _id, name, price, photo },
    } = addedProductInCart;

    const formattedPrice = formatPrice(price);

    content = (
      <>
        <Heading variant="h3" align="center" mgBottom="level3">
          Product added to cart
        </Heading>
        <SC.ProductPreview>
          <div className="photo-box">
            <img
              src={photo ? `${baseURL}/products/${_id}/photo` : noPhoto}
              alt="product"
              className="photo"
            />
          </div>
          <div className="data-box">
            <span className="price">
              {formatPrice(price * quantity)}
              <span className="total-in-cart">{` (total in the cart ${quantity} x ${formattedPrice})`}</span>
            </span>
            <span className="name">
              <span className="quantity">{`${quantity}x `}</span>
              {name}
            </span>
          </div>
        </SC.ProductPreview>
        <HorizontalWrapper mgTop="level3">
          <Button color="blue" clicked={() => onSetModal(false)}>
            Continue shopping
          </Button>
          <Link to="/cart">
            <Button color="blue" filled clicked={() => onSetModal(false)}>
              Go to cart
            </Button>
          </Link>
        </HorizontalWrapper>
      </>
    );
  }

  return content;
};

export default CartItemAdded;
