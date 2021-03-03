import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SC from './TransactionAndOrderProdItem.sc';
import theme from '../../styled/theme';
import ProductThumbnail from '../UI/ProductThumbnail/ProductThumbnail';
import PlainText from '../UI/PlainText';
import { formatPrice, roundOverallPrice } from '../../shared/utility';

const TransactionAndOrderProdItem = (props) => {
  const { data, orderId } = props;
  const { _id: productId, name, price, quantity, photo } = data;

  const roundedOverallPrice = roundOverallPrice(price * quantity);

  return (
    <SC.Wrapper spacing="2" data-test="transaction-and-order-prod-item">
      <Link to={`/product/${productId}`} data-test="product-link">
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
          <Link to={`/product/${productId}`} data-test="product-link">
            {name}
          </Link>
        </span>
        <SC.Price justify="space-between" align="center" flex="1">
          <PlainText size="2" color={theme.colors.light4} data-test="price-per-piece">
            {`${quantity} x ${formatPrice(price)}`}
          </PlainText>
          <PlainText size="4" data-test="overall-price">
            {formatPrice(roundedOverallPrice)}
          </PlainText>
        </SC.Price>
      </SC.NameAndPrice>
    </SC.Wrapper>
  );
};

TransactionAndOrderProdItem.defaultProps = {
  orderId: '',
};

TransactionAndOrderProdItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  orderId: PropTypes.string,
};

export default TransactionAndOrderProdItem;
