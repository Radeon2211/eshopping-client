import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SideBySide from '../UI/SideBySide/SideBySide';
import Filters from '../Filters/Filters';
import ProductList from '../ProductList/ProductList';
import Panel from '../UI/Panel/Panel';

const ProductsAndFilters = (props) => {
  const { page } = props;

  const products = useSelector((state) => state.product.products);
  const isListLoading = useSelector((state) => state.ui.isListLoading);

  return (
    <SideBySide proportion="1/3">
      <Filters products={products} isListLoading={isListLoading} />
      <Panel>
        <ProductList products={products} isListLoading={isListLoading} page={page} />
      </Panel>
    </SideBySide>
  );
};

ProductsAndFilters.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ProductsAndFilters;
