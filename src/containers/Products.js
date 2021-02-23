import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions/indexActions';
import Heading from '../components/UI/Heading/Heading';
import ProductsAndFilters from '../components/ProductsAndFilters/ProductsAndFilters';
import { pages } from '../shared/constants';
import { getParamsWithoutPollution } from '../shared/utility';

const Products = (props) => {
  const {
    location: { search },
  } = props;

  const productsPerPage = useSelector((state) => state.ui.productsPerPage);
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onFetchProducts = useCallback(
    (queryParams, pageType) => dispatch(actions.fetchProducts(queryParams, pageType)),
    [dispatch],
  );

  useEffect(() => {
    onFetchProducts(search, pages.ALL_PRODUCTS);
  }, [search, onFetchProducts, productsPerPage, userProfile]);

  const correctQueryParams = getParamsWithoutPollution(search);
  const { name } = correctQueryParams;
  let headingText = 'All products';
  if (name) {
    headingText = `Results for "${name}"`;
  }

  return (
    <>
      <Heading variant="h3">{headingText}</Heading>
      <ProductsAndFilters page={pages.ALL_PRODUCTS} />
    </>
  );
};

export default Products;
