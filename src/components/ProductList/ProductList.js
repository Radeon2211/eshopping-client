import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProductItem from './ProductItem/ProductItem';
import LoadingOverlay from '../UI/LoadingOverlay/LoadingOverlay';
import Heading from '../UI/Heading/Heading';

const SC = {};
SC.Wrapper = styled.div`
  min-height: 14rem;
  position: relative;
`;

const ProductList = (props) => {
  const { products, isListLoading } = props;

  let loadingOverlay = null;
  if (isListLoading) loadingOverlay = <LoadingOverlay alignLoader="top" loaderSize="small" />;

  let productList = null;
  if (products) {
    if (products.length <= 0) {
      productList = (
        <Heading variant="h4">
          We didn&apos;t find any matching results. Try search something else
        </Heading>
      );
    } else {
      productList = products.map((product) => <ProductItem key={product._id} data={product} />);
    }
  }

  return (
    <SC.Wrapper>
      {loadingOverlay}
      {productList}
    </SC.Wrapper>
  );
};

ProductList.defaultProps = {
  products: null,
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  isListLoading: PropTypes.bool.isRequired,
};

export default ProductList;
