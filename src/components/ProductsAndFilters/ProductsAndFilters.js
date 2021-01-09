import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import SideBySide from '../UI/SideBySide';
import Filters from '../Filters/Filters';
import ProductList from '../ProductList/ProductList';
import PlainPanel from '../UI/Panels/PlainPanel';
import BottomPagination from '../Pagination/BottomPagination/BottomPagination';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import ProductsPerPageController from '../Pagination/ProductsPerPageController';
import FlexWrapper from '../UI/FlexWrapper';
import { TopPagination } from '../../styled/components';
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
  const productsPerPage = useSelector((state) => state.ui.productsPerPage);

  let topPagination = null;
  let bottomPagination = null;
  if (products && productCount > 0) {
    topPagination = (
      <TopPagination>
        <ProductsPerPageController quantityPerPage={productsPerPage} />
        <InputPagination itemQuantity={productCount} quantityPerPage={productsPerPage} />
      </TopPagination>
    );
    bottomPagination = (
      <BottomPagination
        itemQuantity={productCount}
        itemsType={listItemTypes.PRODUCT}
        quantityPerPage={productsPerPage}
      />
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
    <FlexWrapper direction="column" spacing="0">
      <SideBySide proportion="1/3" makeVerticalWhen={1200}>
        {filters}
        <PlainPanel>
          {topPagination}
          <ProductList products={products} isDataLoading={isDataLoading} page={page} />
          {bottomPagination}
        </PlainPanel>
      </SideBySide>
    </FlexWrapper>
  );
};

ProductsAndFilters.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ProductsAndFilters;
