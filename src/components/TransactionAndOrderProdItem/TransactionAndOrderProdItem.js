import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SC from './TransactionAndOrderProdItem.sc';
import theme from '../../styled/theme';
import ProductThumbnail from '../UI/ProductThumbnail/ProductThumbnail';
import PlainText from '../UI/PlainText';
import { formatPrice, roundOverallPrice } from '../../shared/utility/utility';
import FlexWrapper from '../UI/FlexWrapper';

const TransactionAndOrderProdItem = React.memo(({ data, orderId }) => {
  const { _id: productId, name, price, quantity, photo } = data;

  const roundedOverallPrice = roundOverallPrice(price * quantity);

  return (
    <SC.Wrapper data-testid="TransactionAndOrderProdItem">
      <FlexWrapper $spacing="2">
        <Link
          to={`/product/${productId}`}
          data-testid="TransactionAndOrderProdItem-product-link-photo"
        >
          <ProductThumbnail
            photo={photo}
            alt={name}
            productId={productId}
            width="5"
            height="5"
            orderId={orderId}
          />
        </Link>
        <SC.NameAndPrice>
          <span className="name">
            <Link
              to={`/product/${productId}`}
              data-testid="TransactionAndOrderProdItem-product-link-name"
            >
              {name}
            </Link>
          </span>
          <FlexWrapper $justify="space-between" $align="center" $flex="1">
            <PlainText
              $size="2"
              $color={theme.colors.light4}
              data-testid="TransactionAndOrderProdItem-product-price-per-piece"
            >
              {`${quantity} x ${formatPrice(price)}`}
            </PlainText>
            <PlainText $size="4" data-testid="TransactionAndOrderProdItem-product-overall-price">
              {formatPrice(roundedOverallPrice)}
            </PlainText>
          </FlexWrapper>
        </SC.NameAndPrice>
      </FlexWrapper>
    </SC.Wrapper>
  );
});

TransactionAndOrderProdItem.defaultProps = {
  orderId: '',
};

TransactionAndOrderProdItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    photo: PropTypes.bool.isRequired,
  }).isRequired,
  orderId: PropTypes.string,
};

export default TransactionAndOrderProdItem;

TransactionAndOrderProdItem.displayName = 'TransactionAndOrderProdItem';
