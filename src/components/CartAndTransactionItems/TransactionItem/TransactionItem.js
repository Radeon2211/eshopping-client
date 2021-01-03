import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../shared/utility';
import { GrayText } from '../../../styled/components';
import FlexWrapper from '../../UI/FlexWrapper';
import ProductThumbnail from '../../UI/ProductThumbnail';

const SC = {};
SC.Wrapper = styled(FlexWrapper)`
  padding: calc(1.5 * ${({ theme }) => theme.spacings.level2}) 0;

  &:last-child {
    padding-bottom: 0;
  }

  & .name {
    font-size: ${({ theme }) => theme.fontSizes.level3};

    & > a {
      transition: color ${({ theme }) => theme.durations.level1}s;

      &:hover {
        color: ${({ theme }) => theme.colors.green};
      }
    }
  }

  & .overall-price {
    font-size: ${({ theme }) => theme.fontSizes.level4};
  }

  & .price-per-piece {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }
`;


const TransactionItem = (props) => {
  const { data } = props;
  const {
    _id: productId,
    name,
    price,
    quantity,
    photo,
  } = data;

  return (
    <SC.Wrapper>
      <Link to={`/products/${productId}`} data-test="product-link">
        <ProductThumbnail photo={photo} alt={name} productId={productId} width={7} height={7} />
      </Link>
      <FlexWrapper direction="column" justify="center" spacing="level1">
        <span className="name">
          <Link to={`/products/${productId}`} data-test="product-link">
            {name}
          </Link>
        </span>
        <FlexWrapper justify="space-between">
          <GrayText className="price-per-piece">{`${quantity} x ${formatPrice(price)}`}</GrayText>
          <span className="overall-price">{formatPrice(price * quantity)}</span>
        </FlexWrapper>
      </FlexWrapper>
    </SC.Wrapper>
  );
};

TransactionItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default TransactionItem;
