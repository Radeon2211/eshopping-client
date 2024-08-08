import { useCallback } from 'react';
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

export default function CartItemAdded() {
  const productDetails = useSelector((state) => state.product.productDetails);
  const cart = useSelector((state) => state.auth.cart);
  const isCartLoading = useSelector((state) => state.ui.isCartLoading);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

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
        <Heading $variant="h3" $align="center" $mgBottom="level3">
          Product added to cart
        </Heading>
        <FlexWrapper $spacing="level3">
          <ProductThumbnail isPhoto={photo} alt={name} productId={productId} width="8" height="8" />
          <FlexWrapper $direction="column" $align="start" $spacing="level1">
            <PlainText $size="level5" data-testid="CartItemAdded-price-and-quantity">
              {formatPrice(price * quantity)}
              <PlainText $size="level2">
                &nbsp;
                {`(total in the cart ${quantity} x ${formattedPrice})`}
              </PlainText>
            </PlainText>
            <PlainText $size="level3" data-testid="CartItemAdded-quantity-and-name">
              <PlainText $size="level2">{`${quantity} x`}</PlainText>
              &nbsp;
              {name}
            </PlainText>
          </FlexWrapper>
        </FlexWrapper>
        <FlexWrapper $mgTop="level3" $justify="center" $spacing="level3">
          <Button $color="blue" clicked={() => onSetModal(null)}>
            Continue shopping
          </Button>
          <Link to="/cart">
            <Button $color="blue" $filled clicked={() => onSetModal(null)}>
              Go to cart
            </Button>
          </Link>
        </FlexWrapper>
      </>
    );
  }

  return content;
}
