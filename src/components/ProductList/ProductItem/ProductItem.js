import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import theme from '../../../styled/theme';
import * as SC from './ProductItem.sc';
import PlainText from '../../UI/PlainText';
import FlexWrapper from '../../UI/FlexWrapper';
import ProductThumbnail from '../../UI/ProductThumbnail/ProductThumbnail';
import { formatPrice } from '../../../shared/utility/utility';
import { productConditions } from '../../../shared/constants';
import * as propTypes from '../../../shared/propTypes';

const ProductItem = React.memo((props) => {
  const {
    data: { _id, name, price, condition, buyerQuantity, photo },
  } = props;

  let conditionNode = null;
  if (condition !== productConditions.NOT_APPLICABLE) {
    conditionNode = (
      <PlainText size="1" mgTop="1" data-testid="ProductItem-condition">
        <PlainText color={theme.colors.light4}>Condition:</PlainText>
        {` ${condition.slice(0, 1).toUpperCase()}${condition.slice(1)}`}
      </PlainText>
    );
  }

  let buyerQuantityNode = null;
  if (buyerQuantity >= 1) {
    buyerQuantityNode = (
      <div className="buyer-quantity-box" data-testid="ProductItem-buyer-quantity">
        <PlainText size="1" color={theme.colors.light4} alignSelf="flex-end">
          {buyerQuantity === 1 ? '1 person' : `${buyerQuantity} people`} bought
        </PlainText>
      </div>
    );
  }

  return (
    <Link to={`/product/${_id}`} data-testid="ProductItem">
      <SC.Wrapper spacing="3">
        <ProductThumbnail photo={photo} alt={name} productId={_id} width="13" height="15" />
        <FlexWrapper direction="column">
          <PlainText size="3">{name}</PlainText>
          {conditionNode}
          <PlainText size="5" mgTop="2" data-testid="ProductItem-price">
            {formatPrice(price)}
          </PlainText>
          {buyerQuantityNode}
        </FlexWrapper>
      </SC.Wrapper>
    </Link>
  );
});

ProductItem.propTypes = {
  data: PropTypes.shape(propTypes.fullProductItem).isRequired,
};

export default ProductItem;
