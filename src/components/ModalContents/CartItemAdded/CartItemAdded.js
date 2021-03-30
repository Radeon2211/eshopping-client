import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';
import Heading from '../../UI/Heading/Heading';
import FlexWrapper from '../../UI/FlexWrapper';
import PlainText from '../../UI/PlainText';
import Loader from '../../UI/Loader/Loader';
import { formatPrice } from '../../../shared/utility/utility';
import ProductThumbnail from '../../UI/ProductThumbnail/ProductThumbnail';

const CartItemAdded = () => {
  const productDetails = useSelector((state) => state.product.productDetails);
  const cart = useSelector((state) => state.auth.cart);
  const isCartLoading = useSelector((state) => state.ui.isCartLoading);

  const dispatch = useDispatch();
  const onSetModal = useCallback((isModalOpen) => dispatch(actions.setModal(isModalOpen)), [
    dispatch,
  ]);

  const addedProductInCart = cart.find((item) => item?.product?._id === productDetails?._id);

  let content = <Loader />;
  if (!isCartLoading && addedProductInCart) {
    const {
      quantity,
      product: { _id: productId, name, price, photo },
    } = addedProductInCart;

    const formattedPrice = formatPrice(price);

    content = (
      <>
        <Heading variant="h3" align="center" mgBottom="3">
          Product added to cart
        </Heading>
        <FlexWrapper spacing="3">
          <ProductThumbnail photo={photo} alt={name} productId={productId} width="8" height="8" />
          <FlexWrapper direction="column" align="start" spacing="1">
            <PlainText size="5">
              {formatPrice(price * quantity)}
              <PlainText size="2">
                &nbsp;
                {`(total in the cart ${quantity} x ${formattedPrice})`}
              </PlainText>
            </PlainText>
            <PlainText size="3">
              <PlainText size="2">{`${quantity} x`}</PlainText>
              &nbsp;
              {name}
            </PlainText>
          </FlexWrapper>
        </FlexWrapper>
        <FlexWrapper mgTop="3" justify="center" spacing="3">
          <Button color="blue" clicked={() => onSetModal(false)}>
            Continue shopping
          </Button>
          <Link to="/cart" data-testid="CartItemAdded-cart-link">
            <Button color="blue" filled clicked={() => onSetModal(false)}>
              Go to cart
            </Button>
          </Link>
        </FlexWrapper>
      </>
    );
  }

  return content;
};

export default CartItemAdded;
