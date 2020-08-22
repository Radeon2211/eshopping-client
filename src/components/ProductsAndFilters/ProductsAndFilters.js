import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';
import * as SC from './ProductsAndFilters.sc';
import SideBySide from '../UI/SideBySide/SideBySide';
import Filters from '../Filters/Filters';
import ProductList from '../ProductList/ProductList';
import Panel from '../UI/Panel/Panel';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import NumberPagination from '../Pagination/NumberPagination/NumberPagination';
import PaginationCounter from '../Pagination/PaginationCounter/PaginationCounter';
import QuantityPerPageController from '../Pagination/QuantityPerPageController/QuantityPerPageController';
import { listItemTypes } from '../../shared/constants';
import MyIcon from '../UI/MyIcon/MyIcon';
import { ReactComponent as FiltersIcon } from '../../images/SVG/filters.svg';
import { ReactComponent as ArrowIcon } from '../../images/SVG/arrow.svg';

const ProductsAndFilters = (props) => {
  const { page } = props;

  const [filtersIsVisible, setFiltersIsVisible] = useState(false);
  const windowWidth = useWindowWidth();

  const products = useSelector((state) => state.product.products);
  const productCount = useSelector((state) => state.product.productCount);
  const isListLoading = useSelector((state) => state.ui.isListLoading);
  const maxQuantityPerPage = useSelector((state) => state.ui.maxQuantityPerPage);

  let inputPagination = null;
  let numberPagination = null;
  if (productCount !== 0) {
    inputPagination = (
      <SC.ProductsTopbar>
        <QuantityPerPageController />
        <InputPagination
          itemQuantity={productCount}
          isListLoading={isListLoading}
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
          isListLoading={isListLoading}
          maxQuantityPerPage={maxQuantityPerPage}
        />
      </SC.ProductsBottombar>
    );
  }
  let filtersToggler = null;
  if (windowWidth <= 1200) {
    filtersToggler = (
      <SC.FiltersToggler onClick={() => setFiltersIsVisible((prevState) => !prevState)}>
        <MyIcon size="small">
          <FiltersIcon />
        </MyIcon>
        <span className="label">Filters</span>
        <MyIcon size="small" rotation={filtersIsVisible ? -90 : 90}>
          <ArrowIcon />
        </MyIcon>
      </SC.FiltersToggler>
    );
  }

  return (
    <SC.Wrapper>
      {filtersToggler}
      <SideBySide proportion="1/3" makeVerticalWhen={1200}>
        <Filters
          products={products}
          isListLoading={isListLoading}
          isVisible={filtersIsVisible || windowWidth > 1200}
        />
        <Panel>
          {inputPagination}
          <ProductList products={products} isListLoading={isListLoading} page={page} />
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
