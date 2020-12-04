import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as SC from './ProductsAndFilters.sc';
import SideBySide from '../UI/SideBySide';
import Filters from '../Filters/Filters';
import ProductList from '../ProductList/ProductList';
import Panel from '../UI/Panel';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import NumberPagination from '../Pagination/NumberPagination/NumberPagination';
import PaginationCounter from '../Pagination/PaginationCounter/PaginationCounter';
import QuantityPerPageController from '../Pagination/QuantityPerPageController';
import { listItemTypes } from '../../shared/constants';

const ProductsAndFilters = (props) => {
  const { page } = props;

  const products = useSelector((state) => state.product.products);
  const productCount = useSelector((state) => state.product.productCount);
  const isDataLoading = useSelector((state) => state.ui.isDataLoading);
  const maxQuantityPerPage = useSelector((state) => state.ui.maxQuantityPerPage);

  let inputPagination = null;
  let numberPagination = null;
  if (productCount !== 0) {
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

  return (
    <SC.Wrapper>
      <SideBySide proportion="1/3" makeVerticalWhen={1200}>
        <Filters products={products} isDataLoading={isDataLoading} />
        <Panel>
          {inputPagination}
          <ProductList products={products} isDataLoading={isDataLoading} page={page} />
          {numberPagination}
        </Panel>
      </SideBySide>
    </SC.Wrapper>
  );
};

ProductsAndFilters.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ProductsAndFilters;