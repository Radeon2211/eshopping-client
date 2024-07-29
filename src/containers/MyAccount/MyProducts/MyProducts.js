import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import Heading from '../../../components/UI/Heading/Heading';
import ProductsAndFilters from '../../../components/ProductsAndFilters/ProductsAndFilters';
import { scrollToTop } from '../../../shared/utility/utility';
import MetaDescriptor from '../../../components/MetaDescriptor/MetaDescriptor';
import useLastLocation from '../../../shared/hooks/useLastLocation';
import { ProductPageType } from '../../../shared/types/types';

export default function MyProducts({ userProfile }) {
  const { search } = useLocation();

  const lastLocation = useLastLocation();

  const productsPerPage = useSelector((state) => state.ui.productsPerPage);

  const dispatch = useDispatch();
  const onFetchProducts = useCallback(
    (queryParams, pageType) => dispatch(actions.fetchProducts(queryParams, pageType)),
    [dispatch],
  );

  useEffect(() => {
    onFetchProducts(search, ProductPageType.MY_PRODUCTS);
    if (!lastLocation?.pathname.startsWith('/product/')) {
      scrollToTop();
    }
  }, [search, onFetchProducts, productsPerPage, userProfile, lastLocation]);

  return (
    <>
      <MetaDescriptor title="Your offers - E-Shopping" description="Check out your offers" />
      <Heading $variant="h3">My products</Heading>
      <ProductsAndFilters page={ProductPageType.MY_PRODUCTS} />
    </>
  );
}
