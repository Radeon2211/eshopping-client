import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Heading from '../../components/UI/Heading/Heading';
import ProductsAndFilters from '../../components/ProductsAndFilters/ProductsAndFilters';
import { productPages } from '../../shared/constants';
import { getParamsWithoutPollution, scrollToTop } from '../../shared/utility/utility';
import MetaDescriptor from '../../components/MetaDescriptor/MetaDescriptor';
import useLastLocation from '../../shared/useLastLocation';

export default function Products({ location }) {
  const { search } = location;

  const lastLocation = useLastLocation();

  const productsPerPage = useSelector((state) => state.ui.productsPerPage);
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onFetchProducts = useCallback(
    (queryParams, pageType) => dispatch(actions.fetchProducts(queryParams, pageType)),
    [dispatch],
  );

  useEffect(() => {
    onFetchProducts(search, productPages.ALL_PRODUCTS);
    if (!lastLocation?.pathname.startsWith('/product/')) {
      scrollToTop();
    }
  }, [search, onFetchProducts, productsPerPage, userProfile, lastLocation]);

  const correctQueryParams = getParamsWithoutPollution(search);
  const { name } = correctQueryParams;
  let headingText = 'All products';
  if (name) {
    headingText = `Results for "${name}"`;
  }

  return (
    <>
      <MetaDescriptor
        title="E-Shopping - Buy and sell"
        description="E-Shopping - shop where you can buy and sell whatever you want"
      />
      <Heading variant="h3" data-testid="Products-heading">
        {headingText}
      </Heading>
      <ProductsAndFilters page={productPages.ALL_PRODUCTS} />
    </>
  );
}
