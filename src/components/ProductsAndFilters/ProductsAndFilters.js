import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBySide from '../UI/SideBySide';
import Filters from '../Filters/Filters';
import ProductList from '../ProductList/ProductList';
import PlainPanel from '../UI/Panels/PlainPanel';
import BottomPagination from '../Pagination/BottomPagination/BottomPagination';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import ProductsPerPageController from '../Pagination/ProductsPerPageController';
import { TopPagination } from '../../styled/components';
import { listItemTypes } from '../../shared/constants';
import { getParamsWithoutPollution } from '../../shared/utility/utility';

const ProductsAndFilters = (props) => {
  const { page } = props;

  const { search } = useLocation();

  const products = useSelector((state) => state.product.products);
  const productCount = useSelector((state) => state.product.productCount);
  const isDataLoading = useSelector((state) => state.ui.isDataLoading);
  const productsPerPage = useSelector((state) => state.ui.productsPerPage);

  let filters = null;
  if (products || productCount > 0) {
    const correctQueryParams = getParamsWithoutPollution(search);
    if (correctQueryParams.p) delete correctQueryParams.p;
    const queryParamsKeys = Object.keys(correctQueryParams);
    if (
      products?.length > 0 ||
      queryParamsKeys.length >= 2 ||
      (queryParamsKeys.length === 1 && !queryParamsKeys.includes('name'))
    ) {
      filters = <Filters products={products} isDataLoading={isDataLoading} />;
    }
  }

  let productListSection = (
    <ProductList products={products} isDataLoading={isDataLoading} page={page} />
  );
  if (products && productCount > 0) {
    productListSection = (
      <PlainPanel data-testid="ProductsAndFilters-product-list-section">
        <TopPagination>
          <ProductsPerPageController quantityPerPage={productsPerPage} />
          <InputPagination itemQuantity={productCount} quantityPerPage={productsPerPage} />
        </TopPagination>
        <ProductList products={products} isDataLoading={isDataLoading} page={page} />
        <BottomPagination
          itemQuantity={productCount}
          itemsType={listItemTypes.PRODUCT}
          quantityPerPage={productsPerPage}
        />
      </PlainPanel>
    );
  }

  return (
    <SideBySide proportion="1/3" makeVerticalWhen={1200}>
      {filters}
      {productListSection}
    </SideBySide>
  );
};

ProductsAndFilters.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ProductsAndFilters;
