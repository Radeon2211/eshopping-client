import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import ProductItem from './ProductItem/ProductItem';
import LoadingOverlay from '../UI/LoadingOverlay/LoadingOverlay';
import Heading from '../UI/Heading/Heading';
import { pages } from '../../shared/constants';

const SC = {};
SC.Wrapper = styled.div`
  min-height: 14rem;
  position: relative;
`;

const ProductList = (props) => {
  const { products, isListLoading, page } = props;
  const {
    location: { search },
  } = useHistory();

  let loadingOverlay = null;
  if (isListLoading) loadingOverlay = <LoadingOverlay alignLoader="top" loaderSize="small" />;

  let productList = null;
  if (products) {
    if (products.length <= 0) {
      let headingText = '';
      const queryStringKeys = Object.keys(queryString.parse(search));
      if (
        queryStringKeys.length >= 2 ||
        (!queryStringKeys.includes('name') && queryStringKeys.length === 1)
      ) {
        switch (page) {
          case pages.ALL_PRODUCTS:
            headingText = `We didn't find any matching results. Try to search something else or change filters`;
            break;
          case pages.MY_PRODUCTS:
          case pages.USER_PRODUCTS:
            headingText = `We didn't find any matching results. Try to change filters`;
            break;
          default:
            headingText = 'Not found any results';
        }
      } else {
        switch (page) {
          case pages.ALL_PRODUCTS:
            headingText = `We didn't find any matching results. Try search something else`;
            break;
          case pages.MY_PRODUCTS:
            headingText = `You don't have any offers published yet`;
            break;
          case pages.USER_PRODUCTS:
            headingText = `This user doesn't have any offers published yet`;
            break;
          default:
            headingText = 'Not found any results';
        }
      }
      productList = <Heading variant="h4">{headingText}</Heading>;
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
  page: PropTypes.string.isRequired,
};

export default ProductList;
