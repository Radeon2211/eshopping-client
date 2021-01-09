import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { pages } from '../../../shared/constants';
import Heading from '../../../components/UI/Heading/Heading';
import ProductsAndFilters from '../../../components/ProductsAndFilters/ProductsAndFilters';

const MyProducts = (props) => {
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
    onFetchProducts(search, pages.MY_PRODUCTS);
  }, [search, onFetchProducts, productsPerPage, userProfile]);

  return (
    <>
      <Heading variant="h3">My products</Heading>
      <ProductsAndFilters page={pages.MY_PRODUCTS} />
    </>
  );
};

export default MyProducts;
