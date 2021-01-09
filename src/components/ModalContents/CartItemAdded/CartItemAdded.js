import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';
import Heading from '../../UI/Heading/Heading';
import FlexWrapper from '../../UI/FlexWrapper';
import Loader from '../../UI/Loader';
import { formatPrice } from '../../../shared/utility';
import ProductThumbnail from '../../UI/ProductThumbnail/ProductThumbnail';

export const SC = {};
SC.ProductPreview = styled(FlexWrapper)`
  & .name {
    font-size: ${({ theme }) => theme.fontSizes.level3};
  }

  & .quantity {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }

  & .price {
    font-size: ${({ theme }) => theme.fontSizes.level5};
  }

  & .total-in-cart {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }
`;

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
      product: { _id: productId, name, price, photo },
    } = addedProductInCart;

    const formattedPrice = formatPrice(price);

    content = (
      <>
        <Heading variant="h3" align="center" mgBottom="level3">
          Product added to cart
        </Heading>
        <SC.ProductPreview>
          <ProductThumbnail photo={photo} alt={name} productId={productId} width={8} height={8} />
          <FlexWrapper direction="column" align="start" spacing="level1">
            <span className="price">
              {formatPrice(price * quantity)}
              <span className="total-in-cart">{` (total in the cart ${quantity} x ${formattedPrice})`}</span>
            </span>
            <span className="name">
              <span className="quantity">{`${quantity}x `}</span>
              {name}
            </span>
          </FlexWrapper>
        </SC.ProductPreview>
        <FlexWrapper mgTop="level3" justify="center">
          <Button color="blue" clicked={() => onSetModal(false)}>
            Continue shopping
          </Button>
          <Link to="/cart">
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
