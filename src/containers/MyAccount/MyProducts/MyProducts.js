import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { productPages } from '../../../shared/constants';
import Heading from '../../../components/UI/Heading/Heading';
import ProductsAndFilters from '../../../components/ProductsAndFilters/ProductsAndFilters';

const MyProducts = (props) => {
  const {
    userProfile,
    location: { search },
  } = props;

  const productsPerPage = useSelector((state) => state.ui.productsPerPage);

  const dispatch = useDispatch();
  const onFetchProducts = useCallback(
    (queryParams, pageType) => dispatch(actions.fetchProducts(queryParams, pageType)),
    [dispatch],
  );

  useEffect(() => {
    onFetchProducts(search, productPages.MY_PRODUCTS);
  }, [search, onFetchProducts, productsPerPage, userProfile]);

  return (
    <>
      <Heading variant="h3">My products</Heading>
      <ProductsAndFilters page={productPages.MY_PRODUCTS} />
    </>
  );
};

export default MyProducts;
