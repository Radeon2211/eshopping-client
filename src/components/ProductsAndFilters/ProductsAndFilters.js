import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SideBySide from '../UI/SideBySide/SideBySide';
import Filters from '../Filters/Filters';
import ProductList from '../ProductList/ProductList';
import Panel from '../UI/Panel/Panel';
import InputPagination from '../Pagination/InputPagination/InputPagination';

const SC = {};
SC.ProductsTopbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacings.level3};
  padding: 0 ${({ theme }) => theme.spacings.level3};
`;

const ProductsAndFilters = (props) => {
  const { page } = props;

  const products = useSelector((state) => state.product.products);
  const productCount = useSelector((state) => state.product.productCount);
  const isListLoading = useSelector((state) => state.ui.isListLoading);

  let inputPagination = null;
  if (productCount !== 0) {
    inputPagination = (
      <SC.ProductsTopbar>
        <InputPagination itemQuantity={productCount} isListLoading={isListLoading} />
      </SC.ProductsTopbar>
    );
  }

  return (
    <SideBySide proportion="1/3">
      <Filters products={products} isListLoading={isListLoading} />
      <Panel>
        {inputPagination}
        <ProductList products={products} isListLoading={isListLoading} page={page} />
      </Panel>
    </SideBySide>
  );
};

ProductsAndFilters.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ProductsAndFilters;
