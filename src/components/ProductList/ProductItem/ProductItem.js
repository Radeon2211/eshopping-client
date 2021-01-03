/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SC from './ProductItem.sc';
import FlexWrapper from '../../UI/FlexWrapper';
import { GrayText } from '../../../styled/components';
import { formatPrice } from '../../../shared/utility';
import ProductThumbnail from '../../UI/ProductThumbnail';

const ProductItem = (props) => {
  const {
    data: { _id, name, price, condition, quantitySold, photo },
  } = props;

  let conditionNode = null;
  if (condition !== 'not_applicable') {
    conditionNode = (
      <span className="condition">
        <GrayText>Condition: </GrayText>
        {condition}
      </span>
    );
  }

  let quantitySoldNode = null;
  if (quantitySold >= 1) {
    quantitySoldNode = (
      <div className="quantity-sold-box">
        <GrayText className="quantity-sold">
          {quantitySold === 1 ? '1 person' : `${quantitySold} people`} bought
        </GrayText>
      </div>
    );
  }

  return (
    <Link to={`/products/${_id}`}>
      <SC.Wrapper>
        <ProductThumbnail photo={photo} alt={name} productId={_id} width={13} height={15} />
        <FlexWrapper direction="column" spacing="0">
          <span className="name">{name}</span>
          {conditionNode}
          <span className="price">{formatPrice(price)}</span>
          {quantitySoldNode}
        </FlexWrapper>
      </SC.Wrapper>
    </Link>
  );
};

ProductItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProductItem;
