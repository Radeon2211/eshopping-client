import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import * as SC from './ProductsAndFilters.sc';
import SideBySide from '../UI/SideBySide';
import Filters from '../Filters/Filters';
import ProductList from '../ProductList/ProductList';
import PlainPanel from '../UI/Panels/PlainPanel';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import NumberPagination from '../Pagination/NumberPagination/NumberPagination';
import PaginationCounter from '../Pagination/PaginationCounter/PaginationCounter';
import QuantityPerPageController from '../Pagination/QuantityPerPageController';
import { listItemTypes } from '../../shared/constants';

const ProductsAndFilters = (props) => {
  const { page } = props;
  const history = useHistory();
  const {
    location: { search },
  } = history;

  const products = useSelector((state) => state.product.products);
  const productCount = useSelector((state) => state.product.productCount);
  const isDataLoading = useSelector((state) => state.ui.isDataLoading);
  const maxQuantityPerPage = useSelector((state) => state.ui.maxQuantityPerPage);

  let inputPagination = null;
  let numberPagination = null;
  if (products && productCount > 0) {
    inputPagination = (
      <SC.ProductsTopbar>
        <QuantityPerPageController maxQuantityPerPage={maxQuantityPerPage} />
        <InputPagination
          itemQuantity={productCount}
          isDataLoading={isDataLoading}
          maxQuantityPerPage={maxQuantityPerPage}
        />
      </SC.ProductsTopbar>
    );
    numberPagination = (
      <SC.ProductsBottombar>
        <PaginationCounter
          itemQuantity={productCount}
          itemsType={listItemTypes.PRODUCT}
          maxQuantityPerPage={maxQuantityPerPage}
        />
        <NumberPagination
          itemQuantity={productCount}
          isDataLoading={isDataLoading}
          maxQuantityPerPage={maxQuantityPerPage}
        />
      </SC.ProductsBottombar>
    );
  }

  let filters = null;
  if (products || productCount > 0) {
    const queryParams = queryString.parse(search);
    if (queryParams.p) delete queryParams.p;
    const queryParamsKeys = Object.keys(queryParams);
    if (
      products?.length > 0 ||
      queryParamsKeys.length >= 2 ||
      (queryParamsKeys.length === 1 && !queryParamsKeys.includes('name'))
    ) {
      filters = <Filters products={products} isDataLoading={isDataLoading} />;
    }
  }

  return (
    <SC.Wrapper>
      <SideBySide proportion="1/3" makeVerticalWhen={1200}>
        {filters}
        <PlainPanel>
          {inputPagination}
          <ProductList products={products} isDataLoading={isDataLoading} page={page} />
          {numberPagination}
        </PlainPanel>
      </SideBySide>
    </SC.Wrapper>
  );
};

ProductsAndFilters.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ProductsAndFilters;
