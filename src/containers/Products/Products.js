import React, { useEffect, useCallback } from 'react';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Heading from '../../components/UI/Heading/Heading';
import ProductsAndFilters from '../../components/ProductsAndFilters/ProductsAndFilters';
import { pages } from '../../shared/constants';

const Products = (props) => {
  const {
    location: { search },
  } = props;

  const dispatch = useDispatch();
  const onFetchProducts = useCallback(
    (queryStrings) => dispatch(actions.fetchProducts(queryStrings)),
    [dispatch],
  );

  useEffect(() => {
    onFetchProducts(search);
  }, [search, onFetchProducts]);

  const { name } = queryString.parse(search);
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
