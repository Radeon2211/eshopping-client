import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ProductItem from './ProductItem/ProductItem';
import LoadingOverlay from '../UI/LoadingOverlay/LoadingOverlay';
import Heading from '../UI/Heading/Heading';
import { productPages } from '../../shared/constants';
import { getParamsWithoutPollution } from '../../shared/utility/utility';
import * as propTypes from '../../shared/propTypes';

const SC = {};
SC.Wrapper = styled.div`
  min-height: 4rem;
  position: relative;
  width: 100%;
`;

export default function ProductList({ products, isDataLoading, page }) {
  const { search } = useLocation();

  let loadingOverlay = null;
  if (isDataLoading) loadingOverlay = <LoadingOverlay alignLoader="start" />;

  let productList = null;
  if (products) {
    if (products.length <= 0) {
      let headingText = '';
      const correctQueryParams = getParamsWithoutPollution(search);
      if (correctQueryParams.p) delete correctQueryParams.p;
      const queryStringKeys = Object.keys(correctQueryParams);
      if (
        queryStringKeys.length >= 2 ||
        (!queryStringKeys.includes('name') && queryStringKeys.length === 1)
      ) {
        switch (page) {
          case productPages.ALL_PRODUCTS:
            headingText = `We didn't find any matching results. Try to search something else or change filters`;
            break;
          case productPages.MY_PRODUCTS:
          case productPages.USER_PRODUCTS:
            headingText = `We didn't find any matching results. Try to change filters`;
            break;
          default:
            headingText = 'Not found any results';
        }
      } else {
        switch (page) {
          case productPages.ALL_PRODUCTS:
            headingText = `We didn't find any matching results. Try to search something else`;
            break;
          case productPages.MY_PRODUCTS:
            headingText = `You don't have any offers published yet`;
            break;
          case productPages.USER_PRODUCTS:
            headingText = `This user doesn't have any offers published yet`;
            break;
          default:
            headingText = 'Not found any results';
        }
      }
      productList = (
        <Heading $variant="h4" $align="center" data-testid="ProductList-empty-list-info">
          {headingText}
        </Heading>
      );
    } else {
      productList = products.map((product) => <ProductItem key={product._id} data={product} />);
    }
  } else if (products === null) {
    productList = (
      <Heading $variant="h4" $align="center">
        There is a problem to fetch products
      </Heading>
    );
  }

  return (
    <SC.Wrapper data-testid="ProductList">
      {loadingOverlay}
      {productList}
    </SC.Wrapper>
  );
}

ProductList.propTypes = {
  // eslint-disable-next-line react/require-default-props
  products: PropTypes.arrayOf(PropTypes.shape(propTypes.fullProductItem)),
  isDataLoading: PropTypes.bool.isRequired,
  page: PropTypes.oneOf(Object.values(productPages)).isRequired,
};
